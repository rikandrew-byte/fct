const fs = require('fs');
const path = require('path');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const sharp = require('sharp');

// Load .env.local manually
const envPath = path.join(__dirname, '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
const envVars = Object.fromEntries(
  envContent.split('\n')
    .filter(line => line && !line.startsWith('#'))
    .map(line => line.split('='))
);

const GEMINI_API_KEY = envVars.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

// Model names to try (Gemini 2.0 Flash supports image generation)
const MODEL_NAME = 'gemini-2.0-flash-exp'; // or 'imagen-3.0-generative-001'

const jsonPath = path.join(__dirname, 'src', 'data', 'news_en.json');
const postsDir = path.join(__dirname, 'public', 'images', 'posts');

// 13 articles needing images
const articlesNeedingImages = [
  { id: 'fido2-passwordless-trend', title: 'The Passwordless Era: Why FIDO2 is the Future of Banking Security?', summary: 'FIDO2 standard replacing SMS OTP, hardware-based authentication for banking security.', keywords: 'FIDO2, USB security key, hardware token, passwordless authentication, phishing protection, banking security, FIDO2/L2, FCT Tokens' },
  { id: 'biometric-usb-security', title: 'Biometric Security Keys: When Fingerprints Become the Last Shield', summary: 'Fingerprint sensors on USB hardware keys, On-device Processing within Secure Element, prevents unauthorized use.', keywords: 'Biometric USB key, fingerprint authentication, hardware security token, Secure Element, forensics, multi-factor auth, biometric credentials' },
  { id: 'hybrid-software-protection', title: 'Hybrid Software Protection: Why High-end Software Still Needs USB Dongles?', summary: 'USB Dongles combined with Cloud management, Hybrid Licensing model, Offline Security for specialized engineering/medical/media software.', keywords: 'USB dongle, hardware key, Sentinel LDK, software licensing, hybrid deployment, cloud licensing, anti-crack, offline authentication, ISV' },
  { id: 'canary-labs', title: 'Who is CANARY LABS and What Solutions Do They Provide?', summary: 'Industrial operational data management since 1985, Canary Historian, Axiom, Collectors for Smart Factory digital transformation.', keywords: 'Canary Labs, Historian, Axiom, Collectors, SCADA, PLC, IoT sensors, OT data, industrial automation, smart factory, FCT Vinh Thinh partner' },
  { id: 'android-15-security', title: 'How Does Android 15 Protect Against Screen Peaking?', summary: 'Screen recording detection, automatic password protection, Screen Share Protection hides sensitive OTP codes during meetings.', keywords: 'Android 15, screen peeking prevention, screen recording detection, privacy protection, OTP hiding, mobile banking security, DexGuard integration' },
  { id: 'mobile-app-security', title: 'A New Approach to Mobile Application Security', summary: 'Compiler-based protection, Polymorphic Obfuscation, RASP, source code never uploaded to cloud, Guardsquare DexGuard and iXGuard.', keywords: 'Mobile app security, Guardsquare, DexGuard, iXGuard, compiler integration, polymorphic obfuscation, RASP, reverse engineering protection, app hardening' },
  { id: 'rasp-features', title: 'Key Features of Effective RASP Solutions and How They Protect Apps', summary: 'Runtime Application Self-Protection detects rooted/jailbroken devices, debuggers, screen recording, and code integrity tampering.', keywords: 'RASP, Runtime Application Self-Protection, threat detection, root detection, debugger prevention, screen recording block, code integrity, anti-tampering' },
  { id: 'dexguard-android', title: 'Protecting Against Common Malware Attack Techniques on Android with DexGuard', summary: 'String & Class Encryption, Asset Encryption, Accessibility Shield blocks malicious overlays and data theft from malware.', keywords: 'DexGuard, Android security, malware protection, string encryption, class encryption, accessibility shield, overlay attacks, phishing defense' },
  { id: 'mobile-security-mgmt', title: 'MOBILE DEVICE SECURITY MANAGEMENT IN THE DIGITAL ERA', summary: '3-layer approach: MAM, Strong Authentication via tokens, Continuous Monitoring, BYOD Policy for enterprise mobility.', keywords: 'Mobile security management, MAM, MDM, enterprise mobility, BYOD policy, strong authentication, continuous monitoring, device compliance' },
  { id: 'security-awareness', title: 'THE IMPORTANCE OF ENHANCING MOBILE SECURITY AWARENESS', summary: 'Human firewall training, Phishing detection (Smishing), Wi-Fi safety, update habits, no sideloading, security culture.', keywords: 'Security awareness, human firewall, phishing detection, smishing, public Wi-Fi risks, OS updates, sideloading prevention, employee training' },
  { id: 'mobile-security-challenges', title: '4 CHALLENGES IN MOBILE DEVICE SECURITY', summary: 'Data Leakage, Insecure Wi-Fi (Man-in-the-middle), Phishing, Spyware - four biggest mobile security threats.', keywords: 'Mobile security challenges, data leakage, insecure Wi-Fi, phishing attacks, spyware, MITM, mobile threats, device vulnerabilities' },
  { id: 'malware-threats', title: 'POTENTIAL MOBILE SECURITY DESTRUCTION RISKS FROM MALWARE', summary: 'Bankers, Ransomware, Adware, silent Spyware, commercial-grade mobile malware, self-protection apps.', keywords: 'Mobile malware, bankers, ransomware, adware, spyware, silent surveillance, mobile threats, app self-protection, Guardsquare defense' },
  { id: 'attack-vectors', title: '3 TYPICAL MOBILE SECURITY ATTACK VECTORS', summary: 'App-based (fake apps, code injection), Device-based (Zero-day exploits), Network-based (DNS spoofing, SSL Stripping).', keywords: 'Attack vectors, mobile attacks, app-based threats, device exploits, network attacks, DNS spoofing, SSL stripping, threat modeling' }
];

async function generateImage(article, index) {
  const { id, title, summary, keywords } = article;

  // Prompt for professional tech blog thumbnail (1200x630)
  const prompt = `Create a professional technology blog featured image for "${title}". Summary: ${summary}. Keywords: ${keywords}.

Style requirements:
- Dark tech aesthetic with gradient background from dark navy (#020617) to deep blue (#1e3a5f)
- Clean, modern, corporate branding suitable for FCT Vinh Thinh (Vietnamese security solutions company)
- Central illustration using geometric shapes, icons, and minimal text
- Include brand color blue (#3b82f6, #06b6d4) accents and subtle grid lines
- Add small "FCT VINH THINH" watermark at bottom in small gray text
- Dimensions: 1200x630 pixels
- Composition: Title text at top-third, central illustration/graphic, subtle background tech elements (circuits, shields, or abstract data patterns)
- High contrast, professional photography/3D render style, not cartoonish
- Text overlay: Main title should be clearly visible in white

DO NOT include any text other than the main title and brand footer. Focus on symbolic imagery that represents ${keywords.split(',')[0]}`;

  try {
    console.log(`[${index + 1}/13] Generating image for: ${id}`);

    const model = genAI.getGenerativeModel({ model: MODEL_NAME });
    
    // Note: gemini-2.0-flash-exp generates images via generateContent with imageGeneration config
    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.8,
        maxOutputTokens: 1024,
      }
    });

    // Extract image from response
    const response = await result.response;
    const imageData = response.images?.[0];
    
    if (!imageData?.imageBase64) {
      console.warn(`  ⚠ No image data returned for ${id}, trying fallback...`);
      return null;
    }

    // Convert base64 to buffer
    const imageBuffer = Buffer.from(imageData.imageBase64, 'base64');
    
    // Save as WebP with sharp
    const outputPath = path.join(postsDir, `${id}.webp`);
    await sharp(imageBuffer)
      .resize(1200, 630, { fit: 'cover' })
      .webp({ quality: 90 })
      .toFile(outputPath);

    console.log(`  ✓ Saved: ${id}.webp`);
    return outputPath;
  } catch (error) {
    console.error(`  ✗ Error generating ${id}:`, error.message);
    if (error.message.includes('SAFETY')) {
      console.log('  → Safety filter triggered, skipping...');
    }
    return null;
  }
}

async function main() {
  if (!GEMINI_API_KEY) {
    console.error('ERROR: NEXT_PUBLIC_GEMINI_API_KEY not found');
    process.exit(1);
  }

  console.log('🚀 Starting image generation for 13 articles using Gemini 2.0 Flash\n');
  console.log('='.repeat(60));

  // Ensure output directory exists
  if (!fs.existsSync(postsDir)) {
    fs.mkdirSync(postsDir, { recursive: true });
  }

  const results = [];
  for (let i = 0; i < articlesNeedingImages.length; i++) {
    const article = articlesNeedingImages[i];
    const imagePath = await generateImage(article, i);
    results.push({ id: article.id, success: !!imagePath });
    
    // Rate limit delay (Gemini free tier limit)
    if (i < articlesNeedingImages.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 2000)); // 2s delay
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log('\n📊 Summary:');
  const success = results.filter(r => r.success).length;
  console.log(`   Successful: ${success}/${articlesNeedingImages.length}`);
  results.filter(r => !r.success).forEach(r => console.log(`   ✗ Failed: ${r.id}`));

  if (success > 0) {
    console.log('\n✅ Update news_en.json with image paths? (y/n)');
    // Note: Manual update recommended
  }
}

main().catch(console.error);
