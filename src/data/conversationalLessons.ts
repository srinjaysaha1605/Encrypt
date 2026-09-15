export interface CodeSnippet {
  language: string;
  code: string;
  caption?: string;
}

export interface ExampleBox {
  exampleNumber: number;
  title: string;
  input?: string;
  output?: string;
  explanation: string;
}

export interface OptionChoice {
  label: string;
  nextStepId: string;
}

export interface ConversationStep {
  stepId: string;
  mentorMessages: string[];
  codeSnippet?: CodeSnippet;
  exampleBox?: ExampleBox;
  options?: OptionChoice[];
  autoNextStepId?: string;
}

export interface ConversationalLesson {
  id: string;
  number: string;
  title: string;
  keywords: string[];
  initialStepId: string;
  steps: Record<string, ConversationStep>;
}

export const CONVERSATIONAL_LESSONS: Record<string, ConversationalLesson> = {
  hashing: {
    id: 'hashing',
    number: '01',
    title: 'Hashing',
    keywords: ['hashing', 'hash', 'sha256', 'digest', 'avalanche'],
    initialStepId: 'step_1_what',
    steps: {
      step_1_what: {
        stepId: 'step_1_what',
        mentorMessages: [
          'So... you want to master hashing.',
          'Forget the word "encryption" for a moment.',
          'A cryptographic hash function is a one-way mathematical machine. You feed in arbitrary data—a single character, a secret password, or a 50GB file—and it outputs a fixed-length fingerprint called a hash digest.',
        ],
        options: [
          { label: 'Why does it exist?', nextStepId: 'step_2_why' },
          { label: 'Show me an example', nextStepId: 'step_example_1' },
          { label: 'How does it work conceptually?', nextStepId: 'step_3_how' },
        ],
      },
      step_2_why: {
        stepId: 'step_2_why',
        mentorMessages: [
          'Why does hashing exist?',
          'Because storing raw passwords or sending huge files across untrusted networks creates massive liability.',
          'If a server stores plaintext passwords and gets breached, every account is compromised. But if it stores SHA-256 hash digests, an attacker gets useless random hex bytes.',
        ],
        options: [
          { label: 'How does it work conceptually?', nextStepId: 'step_3_how' },
          { label: 'Show me an example', nextStepId: 'step_example_1' },
          { label: 'What are the key terms?', nextStepId: 'step_4_terms' },
        ],
      },
      step_3_how: {
        stepId: 'step_3_how',
        mentorMessages: [
          'Conceptually, think of hashing as a numerical blender.',
          'The mathematical function scrambles input bits through complex rounds of bitwise XOR, shifts, and modular addition.',
          'Key rule: It is strictly ONE-WAY (pre-image resistance). You cannot run the blender in reverse to get the original fruit.',
        ],
        options: [
          { label: 'What are the important terms?', nextStepId: 'step_4_terms' },
          { label: 'What security properties make it safe?', nextStepId: 'step_5_security' },
          { label: 'Show me an example', nextStepId: 'step_example_1' },
        ],
      },
      step_4_terms: {
        stepId: 'step_4_terms',
        mentorMessages: [
          'Here are the core terms you must memorize:',
          '1. Digest / Hash: The fixed 256-bit (64-character hex) output.',
          '2. Pre-image Resistance: Impossible to compute input from output.',
          '3. Collision Resistance: Practically impossible for two different inputs to produce the exact same hash.',
          '4. Avalanche Effect: Changing a single input bit flips ~50% of output bits.',
        ],
        options: [
          { label: 'Explain the Avalanche Effect', nextStepId: 'step_5_security' },
          { label: 'Show me an example', nextStepId: 'step_example_1' },
        ],
      },
      step_5_security: {
        stepId: 'step_5_security',
        mentorMessages: [
          'The security properties of modern SHA-256 are formidable.',
          'There are 2^256 possible SHA-256 output combinations. That is more than the total number of atoms in the observable universe.',
          'Even if every supercomputer on Earth computed hashes for 10,000 years, finding a collision by accident is statistically impossible.',
        ],
        options: [
          { label: 'Where is hashing used in the real world?', nextStepId: 'step_6_realworld' },
          { label: 'Show me an example', nextStepId: 'step_example_1' },
        ],
      },
      step_6_realworld: {
        stepId: 'step_6_realworld',
        mentorMessages: [
          'Real-world uses of hashing:',
          '• Password verification (verifying password hashes upon login)',
          '• File integrity checks (SHA-256 checksums on software downloads)',
          '• Git commit ID calculation (SHA-1 / SHA-256)',
          '• Blockchain block linking (Bitcoin Proof-of-Work)',
        ],
        options: [
          { label: 'What is a common misconception?', nextStepId: 'step_7_misconception' },
          { label: 'Show me an example', nextStepId: 'step_example_1' },
        ],
      },
      step_7_misconception: {
        stepId: 'step_7_misconception',
        mentorMessages: [
          'COMMON MISCONCEPTION:',
          '"Hashing is encryption."',
          'No. Encryption is two-way: you can decrypt ciphertext back into plaintext using a secret key. Hashing has NO key and cannot be decrypted. Once hashed, data is permanently transformed.',
        ],
        options: [
          { label: 'Show me the progressive examples', nextStepId: 'step_example_1' },
          { label: 'Summarize Hashing', nextStepId: 'step_8_summary' },
        ],
      },
      step_8_summary: {
        stepId: 'step_8_summary',
        mentorMessages: [
          'SUMMARY — HASHING:',
          '• One-way mathematical transformation with fixed output size (e.g. 256 bits).',
          '• Fast, deterministic, and collision-resistant.',
          '• Essential for password storage, git commits, and data integrity verification.',
          'Ready to explore Symmetric Encryption next?',
        ],
        options: [
          { label: 'Move to 02 Symmetric Encryption', nextStepId: 'GOTO:symmetric' },
          { label: 'Review Hashing Examples', nextStepId: 'step_example_1' },
        ],
      },

      // EXAMPLES (5 Progressive Examples shown 1 at a time)
      step_example_1: {
        stepId: 'step_example_1',
        mentorMessages: ['EXAMPLE 1 of 5: Basic String Digest (SHA-256)'],
        exampleBox: {
          exampleNumber: 1,
          title: 'SHA-256 Digest of "Hello World"',
          input: 'Hello World',
          output: 'a591a6d40bf420404a011733cfb7b190d62c65bf0bcda32b57b277d9ad9f146e',
          explanation: 'Notice how a short string converts into a fixed 64-character hexadecimal representation.',
        },
        options: [
          { label: '[ NEXT EXAMPLE ]', nextStepId: 'step_example_2' },
          { label: 'Back to lesson choices', nextStepId: 'step_3_how' },
        ],
      },
      step_example_2: {
        stepId: 'step_example_2',
        mentorMessages: ['EXAMPLE 2 of 5: The Avalanche Effect'],
        exampleBox: {
          exampleNumber: 2,
          title: 'Changing 1 Character (Exclamation Mark)',
          input: 'Hello World!',
          output: '7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069',
          explanation: 'Adding just ONE exclamation mark completely changes 100% of the hash output.',
        },
        options: [
          { label: '[ NEXT EXAMPLE ]', nextStepId: 'step_example_3' },
          { label: 'Why did the hash change so much?', nextStepId: 'step_4_terms' },
        ],
      },
      step_example_3: {
        stepId: 'step_example_3',
        mentorMessages: ['EXAMPLE 3 of 5: Hashing Large Files'],
        exampleBox: {
          exampleNumber: 3,
          title: 'SHA-256 of 4GB Linux ISO Installer',
          input: '[ Ubuntu-24.04-desktop-amd64.iso (4.1 GB) ]',
          output: '66e13b0c50d3a77d130a08e6f0b48e3d81b2bfb26d5a0a30b209a25b3401fa95',
          explanation: 'Whether input is 5 letters or 4 Gigabytes, SHA-256 always produces exactly 256 bits (64 hex characters).',
        },
        options: [
          { label: '[ NEXT EXAMPLE ]', nextStepId: 'step_example_4' },
          { label: 'What is a real use case for this?', nextStepId: 'step_6_realworld' },
        ],
      },
      step_example_4: {
        stepId: 'step_example_4',
        mentorMessages: ['EXAMPLE 4 of 5: Password Storage Verification'],
        exampleBox: {
          exampleNumber: 4,
          title: 'Server Verification without Storing Passwords',
          input: 'User inputs password "correcthorsebattery" → Server computes SHA-256',
          output: 'Calculated Hash == Stored Database Hash? TRUE → Access Granted',
          explanation: 'The server compares hashes, never plaintext passwords. It never needs to know your actual password.',
        },
        options: [
          { label: '[ NEXT EXAMPLE ]', nextStepId: 'step_example_5' },
          { label: 'Explain misconceptions', nextStepId: 'step_7_misconception' },
        ],
      },
      step_example_5: {
        stepId: 'step_example_5',
        mentorMessages: ['EXAMPLE 5 of 5: WebCrypto Implementation'],
        codeSnippet: {
          language: 'typescript',
          code: `async function hashString(text: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}`,
          caption: 'Standard WebCrypto API in modern browsers & Node.js',
        },
        options: [
          { label: 'Summarize Hashing', nextStepId: 'step_8_summary' },
          { label: 'Move to 02 Symmetric Encryption', nextStepId: 'GOTO:symmetric' },
        ],
      },
    },
  },

  symmetric: {
    id: 'symmetric',
    number: '02',
    title: 'Symmetric Encryption',
    keywords: ['symmetric', 'aes', 'gcm', 'cipher', 'secret key'],
    initialStepId: 'step_1_what',
    steps: {
      step_1_what: {
        stepId: 'step_1_what',
        mentorMessages: [
          'Welcome to Symmetric Encryption.',
          'Unlike hashing, encryption IS reversible—if you possess the secret key.',
          'In symmetric encryption, the SAME secret key is used to both encrypt plaintext into unreadable ciphertext and decrypt ciphertext back into plaintext.',
        ],
        options: [
          { label: 'Why does it exist?', nextStepId: 'step_2_why' },
          { label: 'Show me an example', nextStepId: 'step_example_1' },
          { label: 'How does it work conceptually?', nextStepId: 'step_3_how' },
        ],
      },
      step_2_why: {
        stepId: 'step_2_why',
        mentorMessages: [
          'Why does symmetric encryption exist?',
          'To guarantee CONFIDENTIALITY over hostile channels.',
          'When you send a message over public Wi-Fi or store sensitive data on a cloud database, symmetric ciphers ensure anyone inspecting raw packets sees only unreadable noise.',
        ],
        options: [
          { label: 'How does it work conceptually?', nextStepId: 'step_3_how' },
          { label: 'What are the key terms?', nextStepId: 'step_4_terms' },
          { label: 'Show me an example', nextStepId: 'step_example_1' },
        ],
      },
      step_3_how: {
        stepId: 'step_3_how',
        mentorMessages: [
          'How does AES-256-GCM work conceptually?',
          'AES operates on 128-bit blocks of data arranged in a 4x4 grid of bytes.',
          'It runs data through 14 rounds of mathematical operations: SubBytes (substitution), ShiftRows, MixColumns, and AddRoundKey.',
          'GCM mode (Galois/Counter Mode) adds an authentication tag to prevent tampering.',
        ],
        options: [
          { label: 'What are the key terms?', nextStepId: 'step_4_terms' },
          { label: 'What security properties does AES offer?', nextStepId: 'step_5_security' },
        ],
      },
      step_4_terms: {
        stepId: 'step_4_terms',
        mentorMessages: [
          'Key terminology in Symmetric Encryption:',
          '1. Plaintext: Unencrypted original readable message.',
          '2. Ciphertext: Encrypted unreadable output.',
          '3. AES-256: Advanced Encryption Standard using a 256-bit secret key.',
          '4. Nonce / IV: Unique Initialization Vector used once per message to prevent pattern analysis.',
          '5. Auth Tag: Galois verification tag that authenticates data integrity.',
        ],
        options: [
          { label: 'What are the security properties?', nextStepId: 'step_5_security' },
          { label: 'Show me an example', nextStepId: 'step_example_1' },
        ],
      },
      step_5_security: {
        stepId: 'step_5_security',
        mentorMessages: [
          'Security properties of AES-256-GCM:',
          '• Confidentiality: Unbreakable without the 256-bit key.',
          '• Authenticated Encryption (AEAD): Detects if an attacker altered even a single bit in transit before attempting decryption.',
          '• Resistance to quantum attacks: 256-bit key length provides 128 bits of quantum security against Grover algorithm.',
        ],
        options: [
          { label: 'Where is it used in the real world?', nextStepId: 'step_6_realworld' },
          { label: 'Show me an example', nextStepId: 'step_example_1' },
        ],
      },
      step_6_realworld: {
        stepId: 'step_6_realworld',
        mentorMessages: [
          'Real-world uses:',
          '• Encrypted hard drives (BitLocker, FileVault, LUKS)',
          '• Signal messaging app media attachments',
          '• HTTPS TLS 1.3 payload encryption',
          '• Encrypted database column storage (Vault, AWS KMS)',
        ],
        options: [
          { label: 'What is a common misconception?', nextStepId: 'step_7_misconception' },
          { label: 'Show me an example', nextStepId: 'step_example_1' },
        ],
      },
      step_7_misconception: {
        stepId: 'step_7_misconception',
        mentorMessages: [
          'COMMON MISCONCEPTION:',
          '"Reusing the same key and Nonce is fine as long as the key is secret."',
          'CRITICAL FAILURE: In AES-GCM, reusing a Nonce with the same key destroys confidentiality and leaks key stream material. Nonces MUST never repeat!',
        ],
        options: [
          { label: 'Show progressive examples', nextStepId: 'step_example_1' },
          { label: 'Summarize Symmetric Encryption', nextStepId: 'step_8_summary' },
        ],
      },
      step_8_summary: {
        stepId: 'step_8_summary',
        mentorMessages: [
          'SUMMARY — SYMMETRIC ENCRYPTION:',
          '• Single shared key for encrypting and decrypting.',
          '• AES-256-GCM is the modern gold standard.',
          '• Fast and handles gigabytes of data with hardware acceleration (AES-NI).',
          'Ready for 03 Asymmetric Encryption?',
        ],
        options: [
          { label: 'Move to 03 Asymmetric Encryption', nextStepId: 'GOTO:asymmetric' },
          { label: 'Review Symmetric Examples', nextStepId: 'step_example_1' },
        ],
      },

      // EXAMPLES
      step_example_1: {
        stepId: 'step_example_1',
        mentorMessages: ['EXAMPLE 1 of 5: Plaintext vs Ciphertext'],
        exampleBox: {
          exampleNumber: 1,
          title: 'Encrypting Financial Payload',
          input: 'Transfer $50,000 to Account #9482',
          output: '7f9a21b8c04e1293a74bef0912d385f1c94e... (Hex Ciphertext)',
          explanation: 'With AES-256, the plaintext becomes unrecognizable noise to anyone watching network packets.',
        },
        options: [
          { label: '[ NEXT EXAMPLE ]', nextStepId: 'step_example_2' },
          { label: 'Back to concepts', nextStepId: 'step_3_how' },
        ],
      },
      step_example_2: {
        stepId: 'step_example_2',
        mentorMessages: ['EXAMPLE 2 of 5: The Role of Nonce/IV'],
        exampleBox: {
          exampleNumber: 2,
          title: 'Same Message, Different Nonce',
          input: 'Message: "PAY $100" with Nonce A vs Nonce B',
          output: 'Ciphertext A: e48b19f0... vs Ciphertext B: 19c7a20e...',
          explanation: 'Using a unique 96-bit Nonce for every encryption guarantees that encrypting the same message twice produces two completely different ciphertexts.',
        },
        options: [
          { label: '[ NEXT EXAMPLE ]', nextStepId: 'step_example_3' },
        ],
      },
      step_example_3: {
        stepId: 'step_example_3',
        mentorMessages: ['EXAMPLE 3 of 5: Authentication Tag (GCM)'],
        exampleBox: {
          exampleNumber: 3,
          title: 'Detecting Tampering Before Decryption',
          input: 'Attacker flips 1 bit in ciphertext during transmission',
          output: 'AES-GCM Decryption → Throws "OperationError: Tag mismatch!"',
          explanation: 'AES-GCM checks the 128-bit Auth Tag first. If corrupted, it aborts immediately without revealing broken plaintext.',
        },
        options: [
          { label: '[ NEXT EXAMPLE ]', nextStepId: 'step_example_4' },
        ],
      },
      step_example_4: {
        stepId: 'step_example_4',
        mentorMessages: ['EXAMPLE 4 of 5: Hardware Acceleration (AES-NI)'],
        exampleBox: {
          exampleNumber: 4,
          title: 'Performance Speeds',
          input: 'Modern x86 / ARM CPU executing AES-NI instructions',
          output: 'Encryption Speed: ~10 Gigabytes per second per core',
          explanation: 'CPUs have dedicated silicon instructions for AES, making symmetric encryption virtually costless in terms of latency.',
        },
        options: [
          { label: '[ NEXT EXAMPLE ]', nextStepId: 'step_example_5' },
        ],
      },
      step_example_5: {
        stepId: 'step_example_5',
        mentorMessages: ['EXAMPLE 5 of 5: WebCrypto AES-GCM Implementation'],
        codeSnippet: {
          language: 'typescript',
          code: `async function encryptAESGCM(key: CryptoKey, plaintext: string) {
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encoded = new TextEncoder().encode(plaintext);
  const ciphertext = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    encoded
  );
  return { ciphertext, iv };
}`,
          caption: 'Encrypting plaintext with AES-GCM in TypeScript',
        },
        options: [
          { label: 'Summarize Symmetric Encryption', nextStepId: 'step_8_summary' },
          { label: 'Move to 03 Asymmetric Encryption', nextStepId: 'GOTO:asymmetric' },
        ],
      },
    },
  },

  asymmetric: {
    id: 'asymmetric',
    number: '03',
    title: 'Asymmetric Encryption',
    keywords: ['asymmetric', 'rsa', 'public key', 'private key', 'ecc'],
    initialStepId: 'step_1_what',
    steps: {
      step_1_what: {
        stepId: 'step_1_what',
        mentorMessages: [
          'Now we tackle Asymmetric Encryption.',
          'Here is the fundamental dilemma of symmetric encryption: how do two parties securely share a secret key across the internet without anyone eavesdropping?',
          'Asymmetric cryptography solves this with a mathematically linked KEYPAIR: a Public Key and a Private Key.',
        ],
        options: [
          { label: 'Why does it exist?', nextStepId: 'step_2_why' },
          { label: 'How does it work conceptually?', nextStepId: 'step_3_how' },
          { label: 'Show me an example', nextStepId: 'step_example_1' },
        ],
      },
      step_2_why: {
        stepId: 'step_2_why',
        mentorMessages: [
          'Why does asymmetric encryption exist?',
          'Because you cannot meet every server or user in person to exchange symmetric secret keys.',
          'Asymmetric encryption lets anyone in the world encrypt a message for you using your public key, but ONLY YOU can decrypt it using your private key.',
        ],
        options: [
          { label: 'How does it work conceptually?', nextStepId: 'step_3_how' },
          { label: 'What are the key terms?', nextStepId: 'step_4_terms' },
        ],
      },
      step_3_how: {
        stepId: 'step_3_how',
        mentorMessages: [
          'Conceptually, think of an open padlock.',
          'Your Public Key is an open padlock that you distribute to the world. Anyone can place a message in a box and snap your padlock shut.',
          'Your Private Key is the unique physical key on your key ring. Only you can unlock that padlock.',
        ],
        options: [
          { label: 'What are the important terms?', nextStepId: 'step_4_terms' },
          { label: 'What are the security properties?', nextStepId: 'step_5_security' },
        ],
      },
      step_4_terms: {
        stepId: 'step_4_terms',
        mentorMessages: [
          'Essential terms in Asymmetric Cryptography:',
          '1. Keypair: Public Key + Private Key.',
          '2. Public Key: Published publicly; used for Encryption or Signature Verification.',
          '3. Private Key: Kept strictly secret; used for Decryption or Signing.',
          '4. RSA: Legacy algorithm based on prime factorization difficulty.',
          '5. ECC / RSA-OAEP: Modern elliptic curve or padded RSA algorithms.',
        ],
        options: [
          { label: 'What are the security properties?', nextStepId: 'step_5_security' },
          { label: 'Show me an example', nextStepId: 'step_example_1' },
        ],
      },
      step_5_security: {
        stepId: 'step_5_security',
        mentorMessages: [
          'Security Properties:',
          '• Trapdoor One-Way Function: Easy to compute in one direction (using public key), computationally impossible to compute in reverse without private key.',
          '• Computational Overhead: Asymmetric encryption is ~1,000x slower than symmetric encryption! That is why it is used only for key exchange, not bulk data.',
        ],
        options: [
          { label: 'Where is it used in the real world?', nextStepId: 'step_6_realworld' },
          { label: 'Show me an example', nextStepId: 'step_example_1' },
        ],
      },
      step_6_realworld: {
        stepId: 'step_6_realworld',
        mentorMessages: [
          'Real-world uses:',
          '• SSH authentication (`~/.ssh/id_rsa`, `id_ed25519`)',
          '• TLS handshake initial key exchange',
          '• PGP / GPG email encryption',
          '• Bitcoin & Ethereum wallet addresses',
        ],
        options: [
          { label: 'What is a common misconception?', nextStepId: 'step_7_misconception' },
          { label: 'Show me an example', nextStepId: 'step_example_1' },
        ],
      },
      step_7_misconception: {
        stepId: 'step_7_misconception',
        mentorMessages: [
          'COMMON MISCONCEPTION:',
          '"I should encrypt my entire 10GB database with RSA public key encryption."',
          'MISTAKE: RSA cannot encrypt data larger than its key size (e.g. 256 bytes)! Hybrid Cryptography is used instead: encrypt data with fast AES, then encrypt the AES key with RSA.',
        ],
        options: [
          { label: 'Show progressive examples', nextStepId: 'step_example_1' },
          { label: 'Summarize Asymmetric Encryption', nextStepId: 'step_8_summary' },
        ],
      },
      step_8_summary: {
        stepId: 'step_8_summary',
        mentorMessages: [
          'SUMMARY — ASYMMETRIC ENCRYPTION:',
          '• Public key encrypts, Private key decrypts.',
          '• Solves the key distribution problem.',
          '• Used in hybrid cryptosystems to encrypt short symmetric keys.',
          'Ready for 04 HMAC?',
        ],
        options: [
          { label: 'Move to 04 HMAC', nextStepId: 'GOTO:hmac' },
          { label: 'Review Asymmetric Examples', nextStepId: 'step_example_1' },
        ],
      },

      // EXAMPLES
      step_example_1: {
        stepId: 'step_example_1',
        mentorMessages: ['EXAMPLE 1 of 5: Generating RSA Keypair'],
        exampleBox: {
          exampleNumber: 1,
          title: 'RSA 2048-bit Key Creation',
          input: 'crypto.subtle.generateKey("RSA-OAEP", 2048)',
          output: 'Public Key (294 bytes) + Private Key (1218 bytes)',
          explanation: 'Public key is placed on your website; Private key is stored safely on your server hardware security module.',
        },
        options: [
          { label: '[ NEXT EXAMPLE ]', nextStepId: 'step_example_2' },
        ],
      },
      step_example_2: {
        stepId: 'step_example_2',
        mentorMessages: ['EXAMPLE 2 of 5: Public Key Encryption Flow'],
        exampleBox: {
          exampleNumber: 2,
          title: 'Alice sends message to Bob',
          input: 'Alice grabs Bob\'s Public Key → Encrypts "Meet at midnight"',
          output: 'Ciphertext: 4a91f80c... (Only Bob\'s Private Key can decrypt)',
          explanation: 'Even if Alice wanted to decrypt her own message after encrypting, she cannot without Bob\'s private key!',
        },
        options: [
          { label: '[ NEXT EXAMPLE ]', nextStepId: 'step_example_3' },
        ],
      },
      step_example_3: {
        stepId: 'step_example_3',
        mentorMessages: ['EXAMPLE 3 of 5: Hybrid Cryptography Pattern'],
        exampleBox: {
          exampleNumber: 3,
          title: 'Hybrid Encryption in Practice',
          input: '1. Generate random AES key → 2. Encrypt 100MB video with AES → 3. Encrypt AES key with RSA Public Key',
          output: 'Send [ Encrypted Video + Encrypted AES Key ]',
          explanation: 'Combines the speed of AES with the secure key sharing of RSA/ECC.',
        },
        options: [
          { label: '[ NEXT EXAMPLE ]', nextStepId: 'step_example_4' },
        ],
      },
      step_example_4: {
        stepId: 'step_example_4',
        mentorMessages: ['EXAMPLE 4 of 5: SSH Authentication'],
        exampleBox: {
          exampleNumber: 4,
          title: 'Logging into GitHub via SSH',
          input: 'GitHub sends challenge → Client signs with Private Key (`id_ed25519`)',
          output: 'GitHub verifies signature with registered Public Key → Authenticated!',
          explanation: 'No password travels over the wire.',
        },
        options: [
          { label: '[ NEXT EXAMPLE ]', nextStepId: 'step_example_5' },
        ],
      },
      step_example_5: {
        stepId: 'step_example_5',
        mentorMessages: ['EXAMPLE 5 of 5: RSA WebCrypto Code'],
        codeSnippet: {
          language: 'typescript',
          code: `async function generateRSAKeyPair() {
  return await crypto.subtle.generateKey(
    {
      name: 'RSA-OAEP',
      modulusLength: 2048,
      publicExponent: new Uint8Array([1, 0, 1]),
      hash: 'SHA-256',
    },
    true,
    ['encrypt', 'decrypt']
  );
}`,
          caption: 'Generating RSA-OAEP keypairs using WebCrypto API',
        },
        options: [
          { label: 'Summarize Asymmetric Encryption', nextStepId: 'step_8_summary' },
          { label: 'Move to 04 HMAC', nextStepId: 'GOTO:hmac' },
        ],
      },
    },
  },

  hmac: {
    id: 'hmac',
    number: '04',
    title: 'HMAC',
    keywords: ['hmac', 'sha256', 'hash-based message authentication', 'api signing'],
    initialStepId: 'step_1_what',
    steps: {
      step_1_what: {
        stepId: 'step_1_what',
        mentorMessages: [
          'Let us analyze HMAC (Hash-based Message Authentication Code).',
          'Standard hashing verifies data integrity (did the file get corrupted?).',
          'HMAC verifies integrity AND authenticity: did this message come from someone who holds our secret key?',
        ],
        options: [
          { label: 'Why does it exist?', nextStepId: 'step_2_why' },
          { label: 'How does it work conceptually?', nextStepId: 'step_3_how' },
          { label: 'Show me an example', nextStepId: 'step_example_1' },
        ],
      },
      step_2_why: {
        stepId: 'step_2_why',
        mentorMessages: [
          'Why not just hash `hash(secretKey + message)`?',
          'Naively concatenating a key and message to hash it is vulnerable to LENGTH EXTENSION ATTACKS in algorithms like MD5 and SHA-1/SHA-2.',
          'HMAC uses a double-hashing construction with inner and outer padding to eliminate length extension vulnerabilities.',
        ],
        options: [
          { label: 'How does it work conceptually?', nextStepId: 'step_3_how' },
          { label: 'What are the key terms?', nextStepId: 'step_4_terms' },
        ],
      },
      step_3_how: {
        stepId: 'step_3_how',
        mentorMessages: [
          'HMAC formula: `HMAC(K, M) = H( (K ^ opad) || H((K ^ ipad) || M) )`',
          '1. Secret key `K` is XORed with an inner pad (`ipad`).',
          '2. Appended with message `M` and hashed (`H`).',
          '3. Result is XORed with outer pad (`opad`) and hashed a second time.',
        ],
        options: [
          { label: 'What are the key terms?', nextStepId: 'step_4_terms' },
          { label: 'What security properties does HMAC offer?', nextStepId: 'step_5_security' },
        ],
      },
      step_4_terms: {
        stepId: 'step_4_terms',
        mentorMessages: [
          'HMAC Terminology:',
          '1. Shared Secret: Key known only to sender and receiver.',
          '2. Message Tag: Cryptographic signature generated by HMAC.',
          '3. Length Extension Attack: Exploit on plain hashes prevented by HMAC.',
          '4. Constant-time Comparison: Timing-attack resistant check function.',
        ],
        options: [
          { label: 'What are the security properties?', nextStepId: 'step_5_security' },
          { label: 'Show me an example', nextStepId: 'step_example_1' },
        ],
      },
      step_5_security: {
        stepId: 'step_5_security',
        mentorMessages: [
          'HMAC Security Properties:',
          '• Authenticity: Proves key ownership.',
          '• Integrity: Tampering with 1 byte of payload invalidates the HMAC tag.',
          '• Resistance to Length Extension: Immune to hash extension attacks.',
        ],
        options: [
          { label: 'Where is HMAC used in the real world?', nextStepId: 'step_6_realworld' },
          { label: 'Show me an example', nextStepId: 'step_example_1' },
        ],
      },
      step_6_realworld: {
        stepId: 'step_6_realworld',
        mentorMessages: [
          'Real-world HMAC applications:',
          '• Webhooks (GitHub, Stripe webhook signatures)',
          '• API Request Signing (AWS Signature v4)',
          '• JWT (JSON Web Tokens) `HS256` signatures',
          '• TOTP 2FA code generation (Google Authenticator)',
        ],
        options: [
          { label: 'What is a common misconception?', nextStepId: 'step_7_misconception' },
          { label: 'Show me an example', nextStepId: 'step_example_1' },
        ],
      },
      step_7_misconception: {
        stepId: 'step_7_misconception',
        mentorMessages: [
          'COMMON MISCONCEPTION:',
          '"Comparing HMAC strings with standard `if (tagA === tagB)` is safe."',
          'VULNERABILITY: Standard string equality returns early on the first mismatched byte, creating a timing side-channel attack! Always use constant-time comparison.',
        ],
        options: [
          { label: 'Show progressive examples', nextStepId: 'step_example_1' },
          { label: 'Summarize HMAC', nextStepId: 'step_8_summary' },
        ],
      },
      step_8_summary: {
        stepId: 'step_8_summary',
        mentorMessages: [
          'SUMMARY — HMAC:',
          '• Keyed hash function for message authentication.',
          '• Combines secret key + hash function securely.',
          '• Fundamental to APIs, Webhooks, and JWT tokens.',
          'Ready for 05 Key Derivation?',
        ],
        options: [
          { label: 'Move to 05 Key Derivation', nextStepId: 'GOTO:kdf' },
          { label: 'Review HMAC Examples', nextStepId: 'step_example_1' },
        ],
      },

      // EXAMPLES
      step_example_1: {
        stepId: 'step_example_1',
        mentorMessages: ['EXAMPLE 1 of 5: Stripe Webhook Verification'],
        exampleBox: {
          exampleNumber: 1,
          title: 'Verifying Stripe Webhook Payload',
          input: 'Payload: {"event": "payment.succeeded", "amount": 5000}',
          output: 'HMAC-SHA256 Header: t=1600000000,v1=a94827104928...',
          explanation: 'Stripe signs the raw HTTP body with your webhook secret key so your server knows the notification is real.',
        },
        options: [
          { label: '[ NEXT EXAMPLE ]', nextStepId: 'step_example_2' },
        ],
      },
      step_example_2: {
        stepId: 'step_example_2',
        mentorMessages: ['EXAMPLE 2 of 5: JWT Token HS256 Signature'],
        exampleBox: {
          exampleNumber: 2,
          title: 'JSON Web Token Authentication',
          input: 'Header + Payload signed with HMAC-SHA256',
          output: 'eyJhbGciOiJIUzI1NiJ9... . eyJzdWIiOiIxMjM0NTY3... . HMAC_SIGNATURE',
          explanation: 'If a user attempts to change their role from "user" to "admin" in the JWT, the HMAC signature verification fails.',
        },
        options: [
          { label: '[ NEXT EXAMPLE ]', nextStepId: 'step_example_3' },
        ],
      },
      step_example_3: {
        stepId: 'step_example_3',
        mentorMessages: ['EXAMPLE 3 of 5: AWS API Signature v4'],
        exampleBox: {
          exampleNumber: 3,
          title: 'Signing AWS S3 API Requests',
          input: 'HTTP Method + Date + Service + Cannonical Headers',
          output: 'Authorization: AWS4-HMAC-SHA256 Credential=AKIA.../Signature=8f...',
          explanation: 'AWS authenticates REST calls by computing nested HMAC-SHA256 signatures.',
        },
        options: [
          { label: '[ NEXT EXAMPLE ]', nextStepId: 'step_example_4' },
        ],
      },
      step_example_4: {
        stepId: 'step_example_4',
        mentorMessages: ['EXAMPLE 4 of 5: 2FA TOTP Generation'],
        exampleBox: {
          exampleNumber: 4,
          title: 'Google Authenticator 6-Digit Codes',
          input: 'HMAC-SHA1(SecretKey, CurrentTimeStep)',
          output: 'Dynamic 6-digit code: 948 271 (valid for 30s)',
          explanation: 'TOTP 2FA calculates an HMAC using the current timestamp as the message.',
        },
        options: [
          { label: '[ NEXT EXAMPLE ]', nextStepId: 'step_example_5' },
        ],
      },
      step_example_5: {
        stepId: 'step_example_5',
        mentorMessages: ['EXAMPLE 5 of 5: WebCrypto HMAC Implementation'],
        codeSnippet: {
          language: 'typescript',
          code: `async function computeHMAC(secretKey: string, message: string) {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    enc.encode(secretKey),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const sig = await crypto.subtle.sign('HMAC', key, enc.encode(message));
  return Array.from(new Uint8Array(sig)).map(b => b.toString(16).padStart(2, '0')).join('');
}`,
          caption: 'Computing HMAC-SHA256 in browser/TypeScript',
        },
        options: [
          { label: 'Summarize HMAC', nextStepId: 'step_8_summary' },
          { label: 'Move to 05 Key Derivation', nextStepId: 'GOTO:kdf' },
        ],
      },
    },
  },

  kdf: {
    id: 'kdf',
    number: '05',
    title: 'Key Derivation',
    keywords: ['kdf', 'pbkdf2', 'argon2', 'scrypt', 'salt', 'work factor'],
    initialStepId: 'step_1_what',
    steps: {
      step_1_what: {
        stepId: 'step_1_what',
        mentorMessages: [
          'Lesson 05: Key Derivation Functions (KDFs).',
          'Human passwords like "P@ssword123" are low entropy, predictable, and weak.',
          'A KDF stretches a low-entropy password into a high-entropy 256-bit cryptographic key, using deliberate computational delay (work factor) and random salt.',
        ],
        options: [
          { label: 'Why does it exist?', nextStepId: 'step_2_why' },
          { label: 'How does it work conceptually?', nextStepId: 'step_3_how' },
          { label: 'Show me an example', nextStepId: 'step_example_1' },
        ],
      },
      step_2_why: {
        stepId: 'step_2_why',
        mentorMessages: [
          'Why do we need slow KDFs?',
          'Standard SHA-256 is TOO FAST. A single GPU can compute 100 BILLION SHA-256 hashes per second, cracking passwords in seconds.',
          'KDFs like PBKDF2, bcrypt, and Argon2id force the CPU/GPU to perform thousands of iterative rounds, reducing GPU cracking speed to a crawl.',
        ],
        options: [
          { label: 'How does it work conceptually?', nextStepId: 'step_3_how' },
          { label: 'What are the key terms?', nextStepId: 'step_4_terms' },
        ],
      },
      step_3_how: {
        stepId: 'step_3_how',
        mentorMessages: [
          'Conceptually, KDFs use three parameters:',
          '1. Password: User string.',
          '2. Salt: Random bytes appended to prevent rainbow table attacks.',
          '3. Iterations / Cost factor: Number of times the hashing loop executes (e.g. 600,000 iterations for PBKDF2).',
        ],
        options: [
          { label: 'What are the important terms?', nextStepId: 'step_4_terms' },
          { label: 'What are the security properties?', nextStepId: 'step_5_security' },
        ],
      },
      step_4_terms: {
        stepId: 'step_4_terms',
        mentorMessages: [
          'KDF Terminology:',
          '1. Salt: Unique random 16+ byte string per user.',
          '2. Work Factor / Iteration Count: Configurable slowdown parameter.',
          '3. Memory Hardness: Memory consumption (Argon2id) that prevents ASIC/GPU acceleration.',
          '4. PBKDF2 / Argon2id: Standards for key derivation.',
        ],
        options: [
          { label: 'What are the security properties?', nextStepId: 'step_5_security' },
          { label: 'Show me an example', nextStepId: 'step_example_1' },
        ],
      },
      step_5_security: {
        stepId: 'step_5_security',
        mentorMessages: [
          'Security Properties:',
          '• Brute-force slowdown: Increases cracking time from seconds to centuries.',
          '• Anti-Rainbow Table: Unique salt guarantees identical passwords produce different hash outputs.',
          '• Memory Hardness: Forces crackers to allocate RAM per thread.',
        ],
        options: [
          { label: 'Where is it used in the real world?', nextStepId: 'step_6_realworld' },
          { label: 'Show me an example', nextStepId: 'step_example_1' },
        ],
      },
      step_6_realworld: {
        stepId: 'step_6_realworld',
        mentorMessages: [
          'Real-world KDF applications:',
          '• Password managers (1Password, Bitwarden derive master AES keys using PBKDF2/Argon2id)',
          '• User authentication backends (Argon2id password hashing)',
          '• Encrypted zip/7z archives',
        ],
        options: [
          { label: 'What is a common misconception?', nextStepId: 'step_7_misconception' },
          { label: 'Show me an example', nextStepId: 'step_example_1' },
        ],
      },
      step_7_misconception: {
        stepId: 'step_7_misconception',
        mentorMessages: [
          'COMMON MISCONCEPTION:',
          '"MD5 or plain SHA-256 with a salt is safe for passwords."',
          'FALSE: Plain SHA256(password + salt) is still dangerously fast. Modern GPUs can calculate 50+ billion salted SHA-256 hashes per second. Always use PBKDF2, bcrypt, or Argon2id!',
        ],
        options: [
          { label: 'Show progressive examples', nextStepId: 'step_example_1' },
          { label: 'Summarize Key Derivation', nextStepId: 'step_8_summary' },
        ],
      },
      step_8_summary: {
        stepId: 'step_8_summary',
        mentorMessages: [
          'SUMMARY — KEY DERIVATION:',
          '• Transforms passwords into cryptographically strong keys.',
          '• Slow by design to defeat GPU brute force.',
          '• Argon2id and PBKDF2-SHA256 are modern standards.',
          'Ready for 06 CSPRNG & Entropy?',
        ],
        options: [
          { label: 'Move to 06 CSPRNG & Entropy', nextStepId: 'GOTO:csprng' },
          { label: 'Review KDF Examples', nextStepId: 'step_example_1' },
        ],
      },

      // EXAMPLES
      step_example_1: {
        stepId: 'step_example_1',
        mentorMessages: ['EXAMPLE 1 of 5: PBKDF2 Iteration Latency'],
        exampleBox: {
          exampleNumber: 1,
          title: 'PBKDF2-SHA256 Execution Time',
          input: 'Password: "mysecretpassword", Iterations: 600,000',
          output: 'Derived 256-bit Key: e912a48b... (Execution Time: ~250ms)',
          explanation: '250ms latency is imperceptible to a logging-in human, but makes 1,000,000,000 automated password guesses impossible.',
        },
        options: [
          { label: '[ NEXT EXAMPLE ]', nextStepId: 'step_example_2' },
        ],
      },
      step_example_2: {
        stepId: 'step_example_2',
        mentorMessages: ['EXAMPLE 2 of 5: The Role of Random Salt'],
        exampleBox: {
          exampleNumber: 2,
          title: 'Salt Prevents Precomputed Attacks',
          input: 'User A & User B both have password "Password123"',
          output: 'Salt A → Derived Key A: 84f... vs Salt B → Derived Key B: 12a...',
          explanation: 'Random salts ensure two users with the exact same password end up with completely different stored hash values.',
        },
        options: [
          { label: '[ NEXT EXAMPLE ]', nextStepId: 'step_example_3' },
        ],
      },
      step_example_3: {
        stepId: 'step_example_3',
        mentorMessages: ['EXAMPLE 3 of 5: Argon2id Memory Hardness'],
        exampleBox: {
          exampleNumber: 3,
          title: 'Argon2id Memory Hardness Parameter',
          input: 'Memory Cost: 64MB RAM per hash derivation',
          output: 'GPU Cracking Efficiency drops by 99.99%',
          explanation: 'GPUs have thousands of cores but limited RAM per core. 64MB memory hardness starves GPU threads.',
        },
        options: [
          { label: '[ NEXT EXAMPLE ]', nextStepId: 'step_example_4' },
        ],
      },
      step_example_4: {
        stepId: 'step_example_4',
        mentorMessages: ['EXAMPLE 4 of 5: 1Password Master Key Derivation'],
        exampleBox: {
          exampleNumber: 4,
          title: 'Deriving Vault AES Key',
          input: 'Master Password + Secret Key string',
          output: '256-bit AES-GCM Vault Key',
          explanation: 'Your local device derives the vault encryption key dynamically. The cloud server never sees your master key.',
        },
        options: [
          { label: '[ NEXT EXAMPLE ]', nextStepId: 'step_example_5' },
        ],
      },
      step_example_5: {
        stepId: 'step_example_5',
        mentorMessages: ['EXAMPLE 5 of 5: WebCrypto PBKDF2 Implementation'],
        codeSnippet: {
          language: 'typescript',
          code: `async function deriveKeyPBKDF2(password: string, salt: Uint8Array) {
  const enc = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    'raw', enc.encode(password), 'PBKDF2', false, ['deriveKey']
  );
  return await crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt, iterations: 600000, hash: 'SHA-256' },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false, ['encrypt', 'decrypt']
  );
}`,
          caption: 'Deriving an AES-GCM key from password via PBKDF2',
        },
        options: [
          { label: 'Summarize Key Derivation', nextStepId: 'step_8_summary' },
          { label: 'Move to 06 CSPRNG & Entropy', nextStepId: 'GOTO:csprng' },
        ],
      },
    },
  },

  csprng: {
    id: 'csprng',
    number: '06',
    title: 'CSPRNG & Entropy',
    keywords: ['csprng', 'entropy', 'randomness', 'prng', 'getrandomvalues'],
    initialStepId: 'step_1_what',
    steps: {
      step_1_what: {
        stepId: 'step_1_what',
        mentorMessages: [
          'Lesson 06: CSPRNG & Entropy.',
          'Cryptography lives or dies by randomness.',
          'If an attacker can predict your random numbers, they can predict your private keys, IVs, nonces, and session tokens—rendering all encryption useless.',
        ],
        options: [
          { label: 'Why does it exist?', nextStepId: 'step_2_why' },
          { label: 'How does it work conceptually?', nextStepId: 'step_3_how' },
          { label: 'Show me an example', nextStepId: 'step_example_1' },
        ],
      },
      step_2_why: {
        stepId: 'step_2_why',
        mentorMessages: [
          'Why standard `Math.random()` is fatal in security:',
          'Standard `Math.random()` is a Pseudo-Random Number Generator (PRNG) like XorShift or V8 xorshift128+.',
          'It is deterministic. Observing just 2 to 5 outputs allows an attacker to calculate the internal state and predict every future output with 100% accuracy!',
        ],
        options: [
          { label: 'How does a CSPRNG work?', nextStepId: 'step_3_how' },
          { label: 'What are the key terms?', nextStepId: 'step_4_terms' },
        ],
      },
      step_3_how: {
        stepId: 'step_3_how',
        mentorMessages: [
          'CSPRNG (Cryptographically Secure Pseudo-Random Number Generator) gathers PHYSICAL ENTROPY from the operating system kernel.',
          'Entropy sources include CPU thermal noise, hardware interrupts, disk I/O timings, and motherboard jitter.',
          'The kernel feeds this hardware entropy into a cryptographic generator (like ChaCha20 or AES-CTR) to produce unpredictable bytes.',
        ],
        options: [
          { label: 'What are the key terms?', nextStepId: 'step_4_terms' },
          { label: 'What security properties does it guarantee?', nextStepId: 'step_5_security' },
        ],
      },
      step_4_terms: {
        stepId: 'step_4_terms',
        mentorMessages: [
          'CSPRNG & Entropy Terms:',
          '1. Entropy: Measure of randomness / unpredictability (measured in bits).',
          '2. CSPRNG: Cryptographically secure random number generator.',
          '3. OS Entropy Pool: `/dev/urandom` in Linux/Mac or `BCryptGenRandom` in Windows.',
          '4. Next-Bit Unpredictability: Given past outputs, impossible to guess the next bit with >50% accuracy.',
        ],
        options: [
          { label: 'What are the security properties?', nextStepId: 'step_5_security' },
          { label: 'Show me an example', nextStepId: 'step_example_1' },
        ],
      },
      step_5_security: {
        stepId: 'step_5_security',
        mentorMessages: [
          'Guaranteed Security Properties:',
          '• Forward Secrecy: Compromising internal state later does not reveal previously generated keys.',
          '• Backwards Security: Compromising state cannot predict future outputs once new entropy is mixed in.',
        ],
        options: [
          { label: 'Where is CSPRNG used in real life?', nextStepId: 'step_6_realworld' },
          { label: 'Show me an example', nextStepId: 'step_example_1' },
        ],
      },
      step_6_realworld: {
        stepId: 'step_6_realworld',
        mentorMessages: [
          'Real-world uses:',
          '• Key generation (RSA, ECC, AES keys)',
          '• Nonce / IV generation',
          '• Session tokens and password reset URL tokens',
          '• OAuth state parameters',
        ],
        options: [
          { label: 'What is a common misconception?', nextStepId: 'step_7_misconception' },
          { label: 'Show me an example', nextStepId: 'step_example_1' },
        ],
      },
      step_7_misconception: {
        stepId: 'step_7_misconception',
        mentorMessages: [
          'COMMON MISCONCEPTION:',
          '"Using `Math.random()` to generate API tokens or session IDs is fine because it looks random."',
          'DISASTER: In 2021, researchers compromised thousands of session tokens because developers used `Math.random()`. NEVER use `Math.random()` for security!',
        ],
        options: [
          { label: 'Show progressive examples', nextStepId: 'step_example_1' },
          { label: 'Summarize CSPRNG', nextStepId: 'step_8_summary' },
        ],
      },
      step_8_summary: {
        stepId: 'step_8_summary',
        mentorMessages: [
          'SUMMARY — CSPRNG & ENTROPY:',
          '• High quality hardware entropy is mandatory.',
          '• Always use `crypto.getRandomValues()` or `crypto.randomBytes()`.',
          '• Never rely on `Math.random()` or timestamp seeds.',
          'Ready for 07 Digital Signatures?',
        ],
        options: [
          { label: 'Move to 07 Digital Signatures', nextStepId: 'GOTO:signatures' },
          { label: 'Review CSPRNG Examples', nextStepId: 'step_example_1' },
        ],
      },

      // EXAMPLES
      step_example_1: {
        stepId: 'step_example_1',
        mentorMessages: ['EXAMPLE 1 of 5: Insecure vs Secure Generation'],
        exampleBox: {
          exampleNumber: 1,
          title: 'Math.random() vs crypto.getRandomValues()',
          input: 'Generate 16 Random Hex Bytes',
          output: 'Insecure Math.random(): "9a82f1b4c" (Predictable) vs CSPRNG: "8f192b00c41e9742a1bc..." (True Entropy)',
          explanation: 'CSPRNG outputs cannot be predicted by analyzing previous sequences.',
        },
        options: [
          { label: '[ NEXT EXAMPLE ]', nextStepId: 'step_example_2' },
        ],
      },
      step_example_2: {
        stepId: 'step_example_2',
        mentorMessages: ['EXAMPLE 2 of 5: Generating Cryptographic Nonces'],
        exampleBox: {
          exampleNumber: 2,
          title: '96-bit AES-GCM IV Generation',
          input: 'crypto.getRandomValues(new Uint8Array(12))',
          output: 'Raw 12 bytes of hardware entropy',
          explanation: 'Ensures zero collisions across millions of encryption passes.',
        },
        options: [
          { label: '[ NEXT EXAMPLE ]', nextStepId: 'step_example_3' },
        ],
      },
      step_example_3: {
        stepId: 'step_example_3',
        mentorMessages: ['EXAMPLE 3 of 5: Linux /dev/urandom Kernel Architecture'],
        exampleBox: {
          exampleNumber: 3,
          title: 'OS Entropy Gathering',
          input: 'Hardware interrupts + CPU clock jitter + SSD timings',
          output: 'Kernel Entropy Pool → `/dev/urandom` stream',
          explanation: 'Operating system continuously collects noise from physical hardware devices.',
        },
        options: [
          { label: '[ NEXT EXAMPLE ]', nextStepId: 'step_example_4' },
        ],
      },
      step_example_4: {
        stepId: 'step_example_4',
        mentorMessages: ['EXAMPLE 4 of 5: Secure UUID v4 Generation'],
        exampleBox: {
          exampleNumber: 4,
          title: 'Cryptographic UUID v4',
          input: 'crypto.randomUUID()',
          output: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
          explanation: 'Modern browsers provide native CSPRNG UUID generation.',
        },
        options: [
          { label: '[ NEXT EXAMPLE ]', nextStepId: 'step_example_5' },
        ],
      },
      step_example_5: {
        stepId: 'step_example_5',
        mentorMessages: ['EXAMPLE 5 of 5: WebCrypto CSPRNG Code'],
        codeSnippet: {
          language: 'typescript',
          code: `function generateSecureToken(byteLength: number = 32): string {
  const array = new Uint8Array(byteLength);
  crypto.getRandomValues(array);
  return Array.from(array).map(b => b.toString(16).padStart(2, '0')).join('');
}`,
          caption: 'Generating secure hex tokens using CSPRNG in browser/TypeScript',
        },
        options: [
          { label: 'Summarize CSPRNG', nextStepId: 'step_8_summary' },
          { label: 'Move to 07 Digital Signatures', nextStepId: 'GOTO:signatures' },
        ],
      },
    },
  },

  signatures: {
    id: 'signatures',
    number: '07',
    title: 'Digital Signatures',
    keywords: ['digital signatures', 'ecdsa', 'rsa-pss', 'signing', 'non-repudiation'],
    initialStepId: 'step_1_what',
    steps: {
      step_1_what: {
        stepId: 'step_1_what',
        mentorMessages: [
          'Lesson 07: Digital Signatures.',
          'A digital signature is the asymmetric equivalent of a handwritten wax seal, but mathematically unforgeable.',
          'The sender signs a message using their PRIVATE key. Anyone can verify the signature using the sender\'s PUBLIC key.',
        ],
        options: [
          { label: 'Why does it exist?', nextStepId: 'step_2_why' },
          { label: 'How does it work conceptually?', nextStepId: 'step_3_how' },
          { label: 'Show me an example', nextStepId: 'step_example_1' },
        ],
      },
      step_2_why: {
        stepId: 'step_2_why',
        mentorMessages: [
          'Why do we need digital signatures?',
          'To guarantee AUTHENTICITY, INTEGRITY, and NON-REPUDIATION.',
          'Non-repudiation means the sender cannot deny signing the payload, because only they possessed the private key used to generate the signature.',
        ],
        options: [
          { label: 'How does it work conceptually?', nextStepId: 'step_3_how' },
          { label: 'What are the key terms?', nextStepId: 'step_4_terms' },
        ],
      },
      step_3_how: {
        stepId: 'step_3_how',
        mentorMessages: [
          'How digital signatures work step-by-step:',
          '1. Sender hashes the document: `hash = SHA256(document)`.',
          '2. Sender encrypts/signs the hash using their PRIVATE KEY to produce the signature.',
          '3. Verifier hashes the received document and decrypts/verifies the signature using the sender\'s PUBLIC KEY.',
          '4. If both hashes match exactly → Signature is Valid!',
        ],
        options: [
          { label: 'What are the key terms?', nextStepId: 'step_4_terms' },
          { label: 'What security properties are guaranteed?', nextStepId: 'step_5_security' },
        ],
      },
      step_4_terms: {
        stepId: 'step_4_terms',
        mentorMessages: [
          'Digital Signature Terms:',
          '1. ECDSA: Elliptic Curve Digital Signature Algorithm (fast, small keys like P-256 or Ed25519).',
          '2. RSA-PSS: Probabilistic Signature Scheme for RSA.',
          '3. Non-Repudiation: Prover cannot falsely deny authorship.',
          '4. Detached Signature: Signature stored in a separate file.',
        ],
        options: [
          { label: 'What are the security properties?', nextStepId: 'step_5_security' },
          { label: 'Show me an example', nextStepId: 'step_example_1' },
        ],
      },
      step_5_security: {
        stepId: 'step_5_security',
        mentorMessages: [
          'Security Properties:',
          '• Unforgeability: Impossible to generate a valid signature without the private key.',
          '• Tamper-Evident: Changing 1 character in the signed document breaks verification.',
        ],
        options: [
          { label: 'Where is it used in real life?', nextStepId: 'step_6_realworld' },
          { label: 'Show me an example', nextStepId: 'step_example_1' },
        ],
      },
      step_6_realworld: {
        stepId: 'step_6_realworld',
        mentorMessages: [
          'Real-world applications:',
          '• Software update verification (macOS App Store, Android APK signatures)',
          '• Crypto transactions (Bitcoin & Ethereum transaction signatures)',
          '• Git commit signing (`git commit -S`)',
          '• Legal e-signatures (DocuSign cryptographic audit trails)',
        ],
        options: [
          { label: 'What is a common misconception?', nextStepId: 'step_7_misconception' },
          { label: 'Show me an example', nextStepId: 'step_example_1' },
        ],
      },
      step_7_misconception: {
        stepId: 'step_7_misconception',
        mentorMessages: [
          'COMMON MISCONCEPTION:',
          '"Digital signatures encrypt the document so no one can read it."',
          'FALSE: Digital signatures do NOT hide or encrypt the document content! The document remains readable plaintext. Signatures only prove WHO authored it and that it was not modified.',
        ],
        options: [
          { label: 'Show progressive examples', nextStepId: 'step_example_1' },
          { label: 'Summarize Digital Signatures', nextStepId: 'step_8_summary' },
        ],
      },
      step_8_summary: {
        stepId: 'step_8_summary',
        mentorMessages: [
          'SUMMARY — DIGITAL SIGNATURES:',
          '• Private key signs, Public key verifies.',
          '• Guarantees authenticity, integrity, and non-repudiation.',
          '• ECDSA P-256 and Ed25519 are modern standard algorithms.',
          'Ready for 08 Certificates & X.509?',
        ],
        options: [
          { label: 'Move to 08 Certificates & X.509', nextStepId: 'GOTO:certificates' },
          { label: 'Review Signature Examples', nextStepId: 'step_example_1' },
        ],
      },

      // EXAMPLES
      step_example_1: {
        stepId: 'step_example_1',
        mentorMessages: ['EXAMPLE 1 of 5: Signing a Contract Document'],
        exampleBox: {
          exampleNumber: 1,
          title: 'ECDSA P-256 Contract Signing',
          input: 'Document: "Agreement to pay $10,000 on Oct 1st"',
          output: 'ECDSA Signature: 3045022100a892f1b4... (64 bytes)',
          explanation: 'The recipient verifies the 64-byte signature against the signer\'s public key.',
        },
        options: [
          { label: '[ NEXT EXAMPLE ]', nextStepId: 'step_example_2' },
        ],
      },
      step_example_2: {
        stepId: 'step_example_2',
        mentorMessages: ['EXAMPLE 2 of 5: Tamper Detection Test'],
        exampleBox: {
          exampleNumber: 2,
          title: 'Altering 1 Character in Signed Text',
          input: 'Altered Text: "Agreement to pay $10,000 on Oct 2nd"',
          output: 'Verification Result: FALSE ✗ (INVALID SIGNATURE)',
          explanation: 'Because the hash changed, the signature verification algorithm rejects the altered document immediately.',
        },
        options: [
          { label: '[ NEXT EXAMPLE ]', nextStepId: 'step_example_3' },
        ],
      },
      step_example_3: {
        stepId: 'step_example_3',
        mentorMessages: ['EXAMPLE 3 of 5: Bitcoin Transaction Signing'],
        exampleBox: {
          exampleNumber: 3,
          title: 'Secured Crypto Wallet Transfers',
          input: 'Transaction Payload: Send 0.5 BTC to 1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
          output: 'secp256k1 ECDSA Signature attached to transaction broadcast',
          explanation: 'Miners verify the signature with your wallet\'s public key before committing the transaction to the blockchain.',
        },
        options: [
          { label: '[ NEXT EXAMPLE ]', nextStepId: 'step_example_4' },
        ],
      },
      step_example_4: {
        stepId: 'step_example_4',
        mentorMessages: ['EXAMPLE 4 of 5: Git GPG/SSH Signed Commits'],
        exampleBox: {
          exampleNumber: 4,
          title: 'GitHub Verified Badge',
          input: 'git commit -m "Fix vulnerability" -S',
          output: 'GitHub displays green [ VERIFIED ] badge on commit',
          explanation: 'GitHub checks your GPG/SSH public key to ensure no malicious contributor forged the commit identity.',
        },
        options: [
          { label: '[ NEXT EXAMPLE ]', nextStepId: 'step_example_5' },
        ],
      },
      step_example_5: {
        stepId: 'step_example_5',
        mentorMessages: ['EXAMPLE 5 of 5: WebCrypto ECDSA Signing Code'],
        codeSnippet: {
          language: 'typescript',
          code: `async function signData(privateKey: CryptoKey, message: string) {
  const enc = new TextEncoder();
  const signature = await crypto.subtle.sign(
    { name: 'ECDSA', hash: 'SHA-256' },
    privateKey,
    enc.encode(message)
  );
  return Array.from(new Uint8Array(signature)).map(b => b.toString(16).padStart(2, '0')).join('');
}`,
          caption: 'Signing data with ECDSA P-256 in WebCrypto API',
        },
        options: [
          { label: 'Summarize Digital Signatures', nextStepId: 'step_8_summary' },
          { label: 'Move to 08 Certificates & X.509', nextStepId: 'GOTO:certificates' },
        ],
      },
    },
  },

  certificates: {
    id: 'certificates',
    number: '08',
    title: 'Certificates & X.509',
    keywords: ['certificates', 'x509', 'ca', 'certificate authority', 'tls cert'],
    initialStepId: 'step_1_what',
    steps: {
      step_1_what: {
        stepId: 'step_1_what',
        mentorMessages: [
          'Lesson 08: Certificates & X.509.',
          'Here is the classic Man-in-the-Middle problem: How do you know a public key really belongs to `google.com` and not an attacker eavesdropping on your router?',
          'An X.509 Digital Certificate binds a domain name to a Public Key, cryptographically signed by a trusted Certificate Authority (CA).',
        ],
        options: [
          { label: 'Why does it exist?', nextStepId: 'step_2_why' },
          { label: 'How does it work conceptually?', nextStepId: 'step_3_how' },
          { label: 'Show me an example', nextStepId: 'step_example_1' },
        ],
      },
      step_2_why: {
        stepId: 'step_2_why',
        mentorMessages: [
          'Why certificates exist:',
          'Without certificates, an attacker sitting on your local Wi-Fi router could intercept your connection, send you THEIR public key, and read all your passwords.',
          'Certificates solve identity verification on the internet.',
        ],
        options: [
          { label: 'How does it work conceptually?', nextStepId: 'step_3_how' },
          { label: 'What are the key terms?', nextStepId: 'step_4_terms' },
        ],
      },
      step_3_how: {
        stepId: 'step_3_how',
        mentorMessages: [
          'Conceptually, an X.509 certificate is a digital passport containing:',
          '1. Subject (Domain name e.g. `api.encrypt.io`).',
          '2. Server\'s Public Key.',
          '3. Issuer (Certificate Authority e.g. Let\'s Encrypt or DigiCert).',
          '4. Expiration Date & SANs (Subject Alternative Names).',
          '5. Digital Signature of the CA verifying all the above!',
        ],
        options: [
          { label: 'What are the important terms?', nextStepId: 'step_4_terms' },
          { label: 'What security properties does it offer?', nextStepId: 'step_5_security' },
        ],
      },
      step_4_terms: {
        stepId: 'step_4_terms',
        mentorMessages: [
          'X.509 Certificate Terms:',
          '1. X.509: Standard format for public key certificates.',
          '2. CA (Certificate Authority): Trusted organization that issues certificates.',
          '3. SAN (Subject Alternative Name): Multi-domain support.',
          '4. CSR (Certificate Signing Request): Request sent to CA to obtain a cert.',
          '5. CRL / OCSP: Certificate Revocation List / Online Status Protocol.',
        ],
        options: [
          { label: 'What are the security properties?', nextStepId: 'step_5_security' },
          { label: 'Show me an example', nextStepId: 'step_example_1' },
        ],
      },
      step_5_security: {
        stepId: 'step_5_security',
        mentorMessages: [
          'Security Properties:',
          '• Web Trust Anchor: Browsers ship with pre-installed Root CA certificates.',
          '• Expiration Limits: Modern TLS certificates expire every 90 days to limit exposure if compromised.',
        ],
        options: [
          { label: 'Where is it used in real life?', nextStepId: 'step_6_realworld' },
          { label: 'Show me an example', nextStepId: 'step_example_1' },
        ],
      },
      step_6_realworld: {
        stepId: 'step_6_realworld',
        mentorMessages: [
          'Real-world uses:',
          '• HTTPS padlocks in web browsers',
          '• mTLS (Mutual TLS) microservice communication',
          '• Code signing certificates (Windows SmartScreen executable signing)',
        ],
        options: [
          { label: 'What is a common misconception?', nextStepId: 'step_7_misconception' },
          { label: 'Show me an example', nextStepId: 'step_example_1' },
        ],
      },
      step_7_misconception: {
        stepId: 'step_7_misconception',
        mentorMessages: [
          'COMMON MISCONCEPTION:',
          '"An HTTPS green padlock means the website is safe and honest."',
          'FALSE: The padlock ONLY means connection encryption and domain ownership are valid. Phishing sites can get free Let\'s Encrypt certificates too!',
        ],
        options: [
          { label: 'Show progressive examples', nextStepId: 'step_example_1' },
          { label: 'Summarize Certificates', nextStepId: 'step_8_summary' },
        ],
      },
      step_8_summary: {
        stepId: 'step_8_summary',
        mentorMessages: [
          'SUMMARY — CERTIFICATES & X.509:',
          '• Binds domain names to public keys.',
          '• Signed by trusted Certificate Authorities.',
          '• Backbone of HTTPS and web security.',
          'Ready for 09 Nonces & IVs?',
        ],
        options: [
          { label: 'Move to 09 Nonces & IVs', nextStepId: 'GOTO:nonces' },
          { label: 'Review Certificate Examples', nextStepId: 'step_example_1' },
        ],
      },

      // EXAMPLES
      step_example_1: {
        stepId: 'step_example_1',
        mentorMessages: ['EXAMPLE 1 of 5: X.509 Certificate Structure'],
        exampleBox: {
          exampleNumber: 1,
          title: 'Inspecting HTTPS Certificate',
          input: 'Domain: api.encrypt-portal.io',
          output: 'Subject: CN=api.encrypt-portal.io | Issuer: Let\'s Encrypt Authority X3 | Exp: 2026-12-31',
          explanation: 'Your browser validates the signature of Let\'s Encrypt against its built-in root store.',
        },
        options: [
          { label: '[ NEXT EXAMPLE ]', nextStepId: 'step_example_2' },
        ],
      },
      step_example_2: {
        stepId: 'step_example_2',
        mentorMessages: ['EXAMPLE 2 of 5: Subject Alternative Names (SAN)'],
        exampleBox: {
          exampleNumber: 2,
          title: 'Multi-Domain Support',
          input: 'Certificate Request for primary domain',
          output: 'SAN Extension: [ encrypt.io, *.encrypt.io, api.encrypt.io ]',
          explanation: 'A single certificate can secure multiple subdomains.',
        },
        options: [
          { label: '[ NEXT EXAMPLE ]', nextStepId: 'step_example_3' },
        ],
      },
      step_example_3: {
        stepId: 'step_example_3',
        mentorMessages: ['EXAMPLE 3 of 5: Certificate Revocation (OCSP)'],
        exampleBox: {
          exampleNumber: 3,
          title: 'OCSP Stapling Check',
          input: 'Server presents OCSP response from CA during TLS handshake',
          output: 'Status: GOOD (Not Revoked)',
          explanation: 'Allows browsers to check if a compromised certificate was cancelled before expiration.',
        },
        options: [
          { label: '[ NEXT EXAMPLE ]', nextStepId: 'step_example_4' },
        ],
      },
      step_example_4: {
        stepId: 'step_example_4',
        mentorMessages: ['EXAMPLE 4 of 5: Let\'s Encrypt ACME Protocol'],
        exampleBox: {
          exampleNumber: 4,
          title: 'Automated 90-Day Renewal',
          input: 'Certbot proves domain ownership via HTTP-01 challenge',
          output: 'New X.509 Cert issued automatically in 5 seconds',
          explanation: 'Automates certificate issuance without human intervention.',
        },
        options: [
          { label: '[ NEXT EXAMPLE ]', nextStepId: 'step_example_5' },
        ],
      },
      step_example_5: {
        stepId: 'step_example_5',
        mentorMessages: ['EXAMPLE 5 of 5: OpenSSL Certificate Parsing Command'],
        codeSnippet: {
          language: 'bash',
          code: `# Inspect certificate details via OpenSSL command line
openssl x509 -in cert.pem -text -noout`,
          caption: 'Command line inspection of X.509 PEM certificate',
        },
        options: [
          { label: 'Summarize Certificates', nextStepId: 'step_8_summary' },
          { label: 'Move to 09 Nonces & IVs', nextStepId: 'GOTO:nonces' },
        ],
      },
    },
  },

  nonces: {
    id: 'nonces',
    number: '09',
    title: 'Nonces & IVs',
    keywords: ['nonces', 'iv', 'initialization vector', 'replay attack', 'nonce reuse'],
    initialStepId: 'step_1_what',
    steps: {
      step_1_what: {
        stepId: 'step_1_what',
        mentorMessages: [
          'Lesson 09: Nonces & Initialization Vectors (IVs).',
          'A Nonce is a "Number used ONCE". An IV is an Initialization Vector.',
          'They provide freshness and randomness to cryptographic ciphers to ensure identical plaintexts never produce identical ciphertexts.',
        ],
        options: [
          { label: 'Why does it exist?', nextStepId: 'step_2_why' },
          { label: 'How does it work conceptually?', nextStepId: 'step_3_how' },
          { label: 'Show me an example', nextStepId: 'step_example_1' },
        ],
      },
      step_2_why: {
        stepId: 'step_2_why',
        mentorMessages: [
          'Why nonces exist:',
          'If you encrypt "YES" five times with the same key and no IV, the ciphertext will be identical all five times.',
          'An eavesdropper watching traffic can deduce patterns without ever cracking the key! Nonces eliminate pattern leakage and prevent replay attacks.',
        ],
        options: [
          { label: 'How does it work conceptually?', nextStepId: 'step_3_how' },
          { label: 'What are the key terms?', nextStepId: 'step_4_terms' },
        ],
      },
      step_3_how: {
        stepId: 'step_3_how',
        mentorMessages: [
          'How it works conceptually:',
          'The cipher algorithm combines the Secret Key + Nonce to initialize the pseudo-random keystream.',
          'Because the Nonce changes with every single message, the keystream is completely unique every time.',
        ],
        options: [
          { label: 'What are the key terms?', nextStepId: 'step_4_terms' },
          { label: 'What are the security properties?', nextStepId: 'step_5_security' },
        ],
      },
      step_4_terms: {
        stepId: 'step_4_terms',
        mentorMessages: [
          'Nonce & IV Terms:',
          '1. Nonce: Number used once.',
          '2. IV (Initialization Vector): Initial state vector passed to cipher.',
          '3. Nonce Reuse Catastrophe: Disastrous vulnerability when a nonce repeats under the same key.',
          '4. Counter Mode (CTR): Incrementing nonce counter per block.',
        ],
        options: [
          { label: 'What are the security properties?', nextStepId: 'step_5_security' },
          { label: 'Show me an example', nextStepId: 'step_example_1' },
        ],
      },
      step_5_security: {
        stepId: 'step_5_security',
        mentorMessages: [
          'Security Properties:',
          '• Semantic Security (IND-CPA): Ensures an adversary cannot distinguish which plaintext corresponds to a given ciphertext.',
          '• Replay Attack Protection: Network nodes discard packets with repeated nonces.',
        ],
        options: [
          { label: 'Where is it used in real life?', nextStepId: 'step_6_realworld' },
          { label: 'Show me an example', nextStepId: 'step_example_1' },
        ],
      },
      step_6_realworld: {
        stepId: 'step_6_realworld',
        mentorMessages: [
          'Real-world applications:',
          '• AES-GCM 96-bit nonces',
          '• TLS 1.3 explicit/implicit sequence numbers',
          '• WPA3 Wi-Fi handshake nonces',
          '• OAuth 1.0/2.0 anti-replay nonces',
        ],
        options: [
          { label: 'What is a common misconception?', nextStepId: 'step_7_misconception' },
          { label: 'Show me an example', nextStepId: 'step_example_1' },
        ],
      },
      step_7_misconception: {
        stepId: 'step_7_misconception',
        mentorMessages: [
          'COMMON MISCONCEPTION:',
          '"The Nonce/IV must be kept secret like the private key."',
          'NO! The Nonce does NOT need to be secret. It can be sent in plain text right next to the ciphertext. The ONLY requirement is that it MUST NEVER REPEAT for a given key.',
        ],
        options: [
          { label: 'Show progressive examples', nextStepId: 'step_example_1' },
          { label: 'Summarize Nonces & IVs', nextStepId: 'step_8_summary' },
        ],
      },
      step_8_summary: {
        stepId: 'step_8_summary',
        mentorMessages: [
          'SUMMARY — NONCES & IVS:',
          '• Uniqueness > Secrecy.',
          '• Prevents pattern leakage and replay attacks.',
          '• Standard size: 96 bits for AES-GCM.',
          'Ready for 10 Encoding vs Encryption?',
        ],
        options: [
          { label: 'Move to 10 Encoding vs Encryption', nextStepId: 'GOTO:encoding' },
          { label: 'Review Nonce Examples', nextStepId: 'step_example_1' },
        ],
      },

      // EXAMPLES
      step_example_1: {
        stepId: 'step_example_1',
        mentorMessages: ['EXAMPLE 1 of 5: Static vs Dynamic Nonce'],
        exampleBox: {
          exampleNumber: 1,
          title: 'Encrypting "SELL" Twice',
          input: 'Pass 1 (Nonce A) vs Pass 2 (Nonce B)',
          output: 'Pass 1 Ciphertext: a498b1... | Pass 2 Ciphertext: 7f12e0...',
          explanation: 'Identical input produces two completely different ciphertexts.',
        },
        options: [
          { label: '[ NEXT EXAMPLE ]', nextStepId: 'step_example_2' },
        ],
      },
      step_example_2: {
        stepId: 'step_example_2',
        mentorMessages: ['EXAMPLE 2 of 5: Nonce Reuse Vulnerability'],
        exampleBox: {
          exampleNumber: 2,
          title: 'Two Messages Encrypted with Same Nonce',
          input: 'C1 = P1 XOR K, C2 = P2 XOR K',
          output: 'C1 XOR C2 = P1 XOR P2 (Key eliminated!)',
          explanation: 'Reusing a nonce allows an attacker to XOR two ciphertexts and cancel out the key entirely!',
        },
        options: [
          { label: '[ NEXT EXAMPLE ]', nextStepId: 'step_example_3' },
        ],
      },
      step_example_3: {
        stepId: 'step_example_3',
        mentorMessages: ['EXAMPLE 3 of 5: Prepended Nonce Transfer Pattern'],
        exampleBox: {
          exampleNumber: 3,
          title: 'Sending IV in Network Payload',
          input: 'Payload Structure: [ 12-byte IV ] + [ Ciphertext ] + [ 16-byte Tag ]',
          output: 'Receiver extracts first 12 bytes as IV to decrypt payload',
          explanation: 'Nonces are public metadata transmitted alongside ciphertext.',
        },
        options: [
          { label: '[ NEXT EXAMPLE ]', nextStepId: 'step_example_4' },
        ],
      },
      step_example_4: {
        stepId: 'step_example_4',
        mentorMessages: ['EXAMPLE 4 of 5: Counter Mode Incrementing'],
        exampleBox: {
          exampleNumber: 4,
          title: 'AES-CTR Block Counter',
          input: 'Block 0: Nonce || 0x0001, Block 1: Nonce || 0x0002',
          output: 'Each 16-byte block gets a unique counter increment',
          explanation: 'Allows parallel encryption of large files across multi-core CPUs.',
        },
        options: [
          { label: '[ NEXT EXAMPLE ]', nextStepId: 'step_example_5' },
        ],
      },
      step_example_5: {
        stepId: 'step_example_5',
        mentorMessages: ['EXAMPLE 5 of 5: WebCrypto Nonce Generation Code'],
        codeSnippet: {
          language: 'typescript',
          code: `function generateAESGCMNonce(): Uint8Array {
  // 96 bits = 12 bytes (NIST recommended IV size for AES-GCM)
  return crypto.getRandomValues(new Uint8Array(12));
}`,
          caption: 'Generating a 96-bit AES-GCM Nonce in TypeScript',
        },
        options: [
          { label: 'Summarize Nonces & IVs', nextStepId: 'step_8_summary' },
          { label: 'Move to 10 Encoding vs Encryption', nextStepId: 'GOTO:encoding' },
        ],
      },
    },
  },

  encoding: {
    id: 'encoding',
    number: '10',
    title: 'Encoding vs Encryption',
    keywords: ['encoding', 'base64', 'hex', 'obfuscation', 'encoding vs encryption'],
    initialStepId: 'step_1_what',
    steps: {
      step_1_what: {
        stepId: 'step_1_what',
        mentorMessages: [
          'Lesson 10: Encoding vs Encryption.',
          'This is one of the most common blunders in modern software development.',
          'Encoding and Encryption are completely different concepts with completely different goals.',
        ],
        options: [
          { label: 'What is Encoding?', nextStepId: 'step_2_why' },
          { label: 'How do they differ conceptually?', nextStepId: 'step_3_how' },
          { label: 'Show me an example', nextStepId: 'step_example_1' },
        ],
      },
      step_2_why: {
        stepId: 'step_2_why',
        mentorMessages: [
          'Encoding transforms data to make it compatible with systems (e.g. converting binary images to Base64 text for HTML/JSON).',
          'Encoding HAS NO SECRET KEY.',
          'Anyone can decode Base64 in 1 microsecond using standard functions like `atob()`. Encoding provides ZERO security!',
        ],
        options: [
          { label: 'How do they differ conceptually?', nextStepId: 'step_3_how' },
          { label: 'What are the key terms?', nextStepId: 'step_4_terms' },
        ],
      },
      step_3_how: {
        stepId: 'step_3_how',
        mentorMessages: [
          'Comparison Matrix:',
          '• ENCODING: Purpose = Data Format Compatibility. Key Required = NO. Security = NONE.',
          '• ENCRYPTION: Purpose = Confidentiality. Key Required = YES. Security = HIGH.',
          '• HASHING: Purpose = Integrity. Key Required = NO. Security = ONE-WAY (Irreversible).',
        ],
        options: [
          { label: 'What are the key terms?', nextStepId: 'step_4_terms' },
          { label: 'What are the security properties?', nextStepId: 'step_5_security' },
        ],
      },
      step_4_terms: {
        stepId: 'step_4_terms',
        mentorMessages: [
          'Key Terms:',
          '1. Base64: 64-character ASCII encoding scheme (A-Z, a-z, 0-9, +, /).',
          '2. Hexadecimal: Base-16 encoding (0-9, a-f).',
          '3. URL Encoding: Percent-encoding (`%20` for space).',
          '4. Obfuscation: Making code hard to read without true encryption.',
        ],
        options: [
          { label: 'What are the security properties?', nextStepId: 'step_5_security' },
          { label: 'Show me an example', nextStepId: 'step_example_1' },
        ],
      },
      step_5_security: {
        stepId: 'step_5_security',
        mentorMessages: [
          'Security Properties:',
          '• Base64 is NOT security. Storing passwords in Base64 is equivalent to storing them in plaintext.',
          '• Obfuscation is NOT security ("Security through obscurity").',
        ],
        options: [
          { label: 'Where is Encoding used in real life?', nextStepId: 'step_6_realworld' },
          { label: 'Show me an example', nextStepId: 'step_example_1' },
        ],
      },
      step_6_realworld: {
        stepId: 'step_6_realworld',
        mentorMessages: [
          'Real-world uses of Encoding:',
          '• Base64 Data URLs (`data:image/png;base64,...`)',
          '• Email attachments (MIME Base64 encoding)',
          '• Basic Auth headers (`Authorization: Basic dXNlcjpwYXNz`)',
        ],
        options: [
          { label: 'What is a common misconception?', nextStepId: 'step_7_misconception' },
          { label: 'Show me an example', nextStepId: 'step_example_1' },
        ],
      },
      step_7_misconception: {
        stepId: 'step_7_misconception',
        mentorMessages: [
          'COMMON MISCONCEPTION:',
          '"I base64-encoded our database password, so it\'s encrypted now!"',
          'CRITICAL VULNERABILITY: Any developer or hacker who opens DevTools or reads the config can decode Base64 in 1 click.',
        ],
        options: [
          { label: 'Show progressive examples', nextStepId: 'step_example_1' },
          { label: 'Summarize Encoding vs Encryption', nextStepId: 'step_8_summary' },
        ],
      },
      step_8_summary: {
        stepId: 'step_8_summary',
        mentorMessages: [
          'SUMMARY — ENCODING VS ENCRYPTION:',
          '• Encoding = Representation format (publicly reversible, no key).',
          '• Encryption = Confidentiality (requires secret key).',
          '• Never confuse Base64 with cryptography.',
          'Ready for 11 Diffie-Hellman / ECDH?',
        ],
        options: [
          { label: 'Move to 11 Diffie-Hellman / ECDH', nextStepId: 'GOTO:dh' },
          { label: 'Review Encoding Examples', nextStepId: 'step_example_1' },
        ],
      },

      // EXAMPLES
      step_example_1: {
        stepId: 'step_example_1',
        mentorMessages: ['EXAMPLE 1 of 5: Decoding Base64 Instantly'],
        exampleBox: {
          exampleNumber: 1,
          title: 'Base64 Decoding Test',
          input: 'Encoded String: "U2VjcmV0UGFzc3dvcmQxMjM="',
          output: 'atob("U2VjcmV0UGFzc3dvcmQxMjM=") → "SecretPassword123"',
          explanation: 'Reversible instantly without any secret key.',
        },
        options: [
          { label: '[ NEXT EXAMPLE ]', nextStepId: 'step_example_2' },
        ],
      },
      step_example_2: {
        stepId: 'step_example_2',
        mentorMessages: ['EXAMPLE 2 of 5: HTTP Basic Auth Header'],
        exampleBox: {
          exampleNumber: 2,
          title: 'Header Inspection',
          input: 'Authorization: Basic dXNlcm5hbWU6c2VjcmV0cGFzcw==',
          output: 'Decodes to: username:secretpass',
          explanation: 'Basic Auth only encodes headers. HTTPS encryption is required to protect it in transit!',
        },
        options: [
          { label: '[ NEXT EXAMPLE ]', nextStepId: 'step_example_3' },
        ],
      },
      step_example_3: {
        stepId: 'step_example_3',
        mentorMessages: ['EXAMPLE 3 of 5: Hexadecimal Representation'],
        exampleBox: {
          exampleNumber: 3,
          title: 'String to Hex Conversion',
          input: 'Text: "CRYPTO"',
          output: 'Hex Bytes: 43 52 59 50 54 4f',
          explanation: 'Hex represents ASCII/UTF-8 byte values directly in base-16 notation.',
        },
        options: [
          { label: '[ NEXT EXAMPLE ]', nextStepId: 'step_example_4' },
        ],
      },
      step_example_4: {
        stepId: 'step_example_4',
        mentorMessages: ['EXAMPLE 4 of 5: URL Encoding Special Characters'],
        exampleBox: {
          exampleNumber: 4,
          title: 'Percent-Encoding for Web URLs',
          input: 'Query String: "user=john doe&role=admin"',
          output: 'Encoded: "user=john%20doe%26role%3Dadmin"',
          explanation: 'Prevents special characters from corrupting HTTP query parameters.',
        },
        options: [
          { label: '[ NEXT EXAMPLE ]', nextStepId: 'step_example_5' },
        ],
      },
      step_example_5: {
        stepId: 'step_example_5',
        mentorMessages: ['EXAMPLE 5 of 5: TypeScript Base64 vs AES-GCM'],
        codeSnippet: {
          language: 'typescript',
          code: `// Base64 Encoding (NOT SECURE):
const encoded = btoa("secret_data"); // reversible by anyone

// AES-256-GCM Encryption (SECURE):
const encrypted = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, data);`,
          caption: 'Comparing Base64 encoding vs WebCrypto AES encryption',
        },
        options: [
          { label: 'Summarize Encoding vs Encryption', nextStepId: 'step_8_summary' },
          { label: 'Move to 11 Diffie-Hellman / ECDH', nextStepId: 'GOTO:dh' },
        ],
      },
    },
  },

  dh: {
    id: 'dh',
    number: '11',
    title: 'Diffie-Hellman / ECDH',
    keywords: ['dh', 'ecdh', 'diffie-hellman', 'key exchange', 'forward secrecy'],
    initialStepId: 'step_1_what',
    steps: {
      step_1_what: {
        stepId: 'step_1_what',
        mentorMessages: [
          'Lesson 11: Diffie-Hellman & ECDH Key Exchange.',
          'Diffie-Hellman is one of the greatest achievements in computer science history.',
          'It allows two strangers (Alice and Bob) to establish a shared secret key over an insecure, public channel without sending the key itself over the wire!',
        ],
        options: [
          { label: 'Why does it exist?', nextStepId: 'step_2_why' },
          { label: 'How does it work conceptually?', nextStepId: 'step_3_how' },
          { label: 'Show me an example', nextStepId: 'step_example_1' },
        ],
      },
      step_2_why: {
        stepId: 'step_2_why',
        mentorMessages: [
          'Why Diffie-Hellman exists:',
          'Before Diffie-Hellman (1976), if two parties wanted to encrypt communications, they had to physically meet or send a courier with a codebook.',
          'ECDH (Elliptic Curve Diffie-Hellman) powers every HTTPS connection, SSH session, and encrypted chat today.',
        ],
        options: [
          { label: 'How does it work conceptually?', nextStepId: 'step_3_how' },
          { label: 'What are the key terms?', nextStepId: 'step_4_terms' },
        ],
      },
      step_3_how: {
        stepId: 'step_3_how',
        mentorMessages: [
          'The Famous Paint-Mixing Analogy:',
          '1. Alice & Bob agree on a public starting color (e.g. Yellow). Eavesdropper Eve sees Yellow.',
          '2. Alice picks secret color Red; Bob picks secret color Blue.',
          '3. Alice mixes Yellow + Red → Orange; sends Orange to Bob. (Eve sees Orange).',
          '4. Bob mixes Yellow + Blue → Cyan; sends Cyan to Alice. (Eve sees Cyan).',
          '5. Alice adds her secret Red to Cyan → Brown. Bob adds his secret Blue to Orange → Brown.',
          'Both now share the EXACT SAME SECRET COLOR (Brown), but Eve cannot un-mix the colors!',
        ],
        options: [
          { label: 'What are the key terms?', nextStepId: 'step_4_terms' },
          { label: 'What security properties does ECDH offer?', nextStepId: 'step_5_security' },
        ],
      },
      step_4_terms: {
        stepId: 'step_4_terms',
        mentorMessages: [
          'ECDH Key Terms:',
          '1. ECDH: Elliptic Curve Diffie-Hellman key agreement.',
          '2. Ephemeral Keys: Single-use temporary keypairs created per session.',
          '3. Perfect Forward Secrecy (PFS): Prevents past session decryption even if server private key is leaked later.',
          '4. Curve25519 / P-256: Standard elliptic curves.',
        ],
        options: [
          { label: 'What are the security properties?', nextStepId: 'step_5_security' },
          { label: 'Show me an example', nextStepId: 'step_example_1' },
        ],
      },
      step_5_security: {
        stepId: 'step_5_security',
        mentorMessages: [
          'Security Properties:',
          '• Perfect Forward Secrecy (PFS): If an attacker steals a server\'s private key next year, they CANNOT decrypt recorded past TLS sessions.',
          '• Discrete Logarithm / Elliptic Curve Difficulty: Practically impossible to compute secret scalar from public curve point.',
        ],
        options: [
          { label: 'Where is ECDH used in real life?', nextStepId: 'step_6_realworld' },
          { label: 'Show me an example', nextStepId: 'step_example_1' },
        ],
      },
      step_6_realworld: {
        stepId: 'step_6_realworld',
        mentorMessages: [
          'Real-world applications:',
          '• TLS 1.3 Key Exchange (Mandatory ECDHE)',
          '• Signal Protocol double ratchet key agreement',
          '• WhatsApp end-to-end encryption',
          '• SSH key exchange (curve25519-sha256)',
        ],
        options: [
          { label: 'What is a common misconception?', nextStepId: 'step_7_misconception' },
          { label: 'Show me an example', nextStepId: 'step_example_1' },
        ],
      },
      step_7_misconception: {
        stepId: 'step_7_misconception',
        mentorMessages: [
          'COMMON MISCONCEPTION:',
          '"ECDH encrypts messages directly."',
          'FALSE: ECDH does NOT encrypt messages! ECDH only derives a shared secret symmetric key. You then feed that key into AES-256-GCM to encrypt messages.',
        ],
        options: [
          { label: 'Show progressive examples', nextStepId: 'step_example_1' },
          { label: 'Summarize Diffie-Hellman', nextStepId: 'step_8_summary' },
        ],
      },
      step_8_summary: {
        stepId: 'step_8_summary',
        mentorMessages: [
          'SUMMARY — DIFFIE-HELLMAN / ECDH:',
          '• Derives shared key over public network without sending key.',
          '• Provides Perfect Forward Secrecy (PFS).',
          '• Backbone of modern TLS 1.3 and Signal messaging.',
          'Ready for 12 PKI?',
        ],
        options: [
          { label: 'Move to 12 PKI', nextStepId: 'GOTO:pki' },
          { label: 'Review ECDH Examples', nextStepId: 'step_example_1' },
        ],
      },

      // EXAMPLES
      step_example_1: {
        stepId: 'step_example_1',
        mentorMessages: ['EXAMPLE 1 of 5: Alice & Bob Shared Secret Agreement'],
        exampleBox: {
          exampleNumber: 1,
          title: 'ECDH P-256 Key Exchange Result',
          input: 'Alice (Priv A + Pub B) vs Bob (Priv B + Pub A)',
          output: 'Derived Shared Key (Alice): 94a82710... == Derived Shared Key (Bob): 94a82710...',
          explanation: 'Both parties compute the exact same 256-bit symmetric key without transmitting it across the network.',
        },
        options: [
          { label: '[ NEXT EXAMPLE ]', nextStepId: 'step_example_2' },
        ],
      },
      step_example_2: {
        stepId: 'step_example_2',
        mentorMessages: ['EXAMPLE 2 of 5: Eavesdropper Eve View'],
        exampleBox: {
          exampleNumber: 2,
          title: 'Packet Sniffer (Wireshark) View',
          input: 'Eve intercepts PubKey A + PubKey B from network wire',
          output: 'Eve cannot derive shared key (Solving ECDLP takes 10^18 years)',
          explanation: 'Public keys are safe to transmit over unencrypted network channels.',
        },
        options: [
          { label: '[ NEXT EXAMPLE ]', nextStepId: 'step_example_3' },
        ],
      },
      step_example_3: {
        stepId: 'step_example_3',
        mentorMessages: ['EXAMPLE 3 of 5: Perfect Forward Secrecy (PFS) in Action'],
        exampleBox: {
          exampleNumber: 3,
          title: 'Server Compromise Simulation',
          input: 'Attacker steals server long-term RSA key in 2027',
          output: 'Recorded 2026 TLS 1.3 traffic remains ENCRYPTED & UNREADABLE',
          explanation: 'Because session keys were ephemeral ECDH keys destroyed after closing the connection.',
        },
        options: [
          { label: '[ NEXT EXAMPLE ]', nextStepId: 'step_example_4' },
        ],
      },
      step_example_4: {
        stepId: 'step_example_4',
        mentorMessages: ['EXAMPLE 4 of 5: Signal Double Ratchet Algorithm'],
        exampleBox: {
          exampleNumber: 4,
          title: 'Instant Messaging Key Rotation',
          input: 'Every message exchange executes an ephemeral ECDH ratchet step',
          output: 'Compromising message #100 does not decrypt message #101',
          explanation: 'Signal advances keys continuously per chat message.',
        },
        options: [
          { label: '[ NEXT EXAMPLE ]', nextStepId: 'step_example_5' },
        ],
      },
      step_example_5: {
        stepId: 'step_example_5',
        mentorMessages: ['EXAMPLE 5 of 5: WebCrypto ECDH Code'],
        codeSnippet: {
          language: 'typescript',
          code: `async function deriveECDHSharedSecret(privateKey: CryptoKey, publicKey: CryptoKey) {
  return await crypto.subtle.deriveBits(
    { name: 'ECDH', public: publicKey },
    privateKey,
    256
  );
}`,
          caption: 'Deriving a 256-bit shared secret using ECDH in WebCrypto API',
        },
        options: [
          { label: 'Summarize Diffie-Hellman', nextStepId: 'step_8_summary' },
          { label: 'Move to 12 PKI', nextStepId: 'GOTO:pki' },
        ],
      },
    },
  },

  pki: {
    id: 'pki',
    number: '12',
    title: 'PKI',
    keywords: ['pki', 'public key infrastructure', 'root ca', 'chain of trust'],
    initialStepId: 'step_1_what',
    steps: {
      step_1_what: {
        stepId: 'step_1_what',
        mentorMessages: [
          'Lesson 12: Public Key Infrastructure (PKI).',
          'PKI is the entire ecosystem of hardware, software, policies, and cryptographic protocols that creates, manages, distributes, and revokes digital certificates.',
        ],
        options: [
          { label: 'Why does it exist?', nextStepId: 'step_2_why' },
          { label: 'How does the Chain of Trust work?', nextStepId: 'step_3_how' },
          { label: 'Show me an example', nextStepId: 'step_example_1' },
        ],
      },
      step_2_why: {
        stepId: 'step_2_why',
        mentorMessages: [
          'Why PKI exists:',
          'Cryptographic algorithms are useless if you don\'t know WHO you are communicating with.',
          'PKI provides global identity governance, allowing billions of devices to trust each other across borders.',
        ],
        options: [
          { label: 'How does the Chain of Trust work?', nextStepId: 'step_3_how' },
          { label: 'What are the key terms?', nextStepId: 'step_4_terms' },
        ],
      },
      step_3_how: {
        stepId: 'step_3_how',
        mentorMessages: [
          'The Chain of Trust Hierarchy:',
          '1. Root CA: Self-signed certificate kept locked in an offline vault inside a secure hardware facility.',
          '2. Intermediate CA: Signed by Root CA. Issues leaf certificates for daily operations.',
          '3. Leaf / End-Entity Certificate: Issued to domain e.g. `api.encrypt.io`.',
        ],
        options: [
          { label: 'What are the key terms?', nextStepId: 'step_4_terms' },
          { label: 'What security properties are enforced?', nextStepId: 'step_5_security' },
        ],
      },
      step_4_terms: {
        stepId: 'step_4_terms',
        mentorMessages: [
          'PKI Terms:',
          '1. Trust Store: OS/Browser pre-installed list of trusted Root CAs.',
          '2. HSM (Hardware Security Module): Tamper-proof physical hardware storing private keys.',
          '3. Certificate Pinning: Hardcoding expected cert public key in apps.',
        ],
        options: [
          { label: 'What are the security properties?', nextStepId: 'step_5_security' },
          { label: 'Show me an example', nextStepId: 'step_example_1' },
        ],
      },
      step_5_security: {
        stepId: 'step_5_security',
        mentorMessages: [
          'Security Properties:',
          '• Hierarchical Trust Delegation.',
          '• Blast Radius Containment: If an Intermediate CA key is compromised, revoking it invalidates sub-certificates without burning the offline Root CA.',
        ],
        options: [
          { label: 'Where is PKI used in real life?', nextStepId: 'step_6_realworld' },
          { label: 'Show me an example', nextStepId: 'step_example_1' },
        ],
      },
      step_6_realworld: {
        stepId: 'step_6_realworld',
        mentorMessages: [
          'Real-world applications:',
          '• Web HTTPS Infrastructure',
          '• Enterprise Active Directory Certificate Services (AD CS)',
          '• Apple iOS / Android app signature verification',
          '• Smart Card PIV/CAC employee login',
        ],
        options: [
          { label: 'What is a common misconception?', nextStepId: 'step_7_misconception' },
          { label: 'Show me an example', nextStepId: 'step_example_1' },
        ],
      },
      step_7_misconception: {
        stepId: 'step_7_misconception',
        mentorMessages: [
          'COMMON MISCONCEPTION:',
          '"Root CAs sign domain certificates directly."',
          'FALSE: Root CAs almost NEVER sign leaf domain certificates directly! Doing so would expose the Root private key online. Intermediate CAs do all routine signing.',
        ],
        options: [
          { label: 'Show progressive examples', nextStepId: 'step_example_1' },
          { label: 'Summarize PKI', nextStepId: 'step_8_summary' },
        ],
      },
      step_8_summary: {
        stepId: 'step_8_summary',
        mentorMessages: [
          'SUMMARY — PKI:',
          '• Global identity & trust management system.',
          '• Root CA → Intermediate CA → Leaf Certificate.',
          '• Essential for Internet-scale security.',
          'Ready for final lesson: 13 TLS?',
        ],
        options: [
          { label: 'Move to 13 TLS', nextStepId: 'GOTO:tls' },
          { label: 'Review PKI Examples', nextStepId: 'step_example_1' },
        ],
      },

      // EXAMPLES
      step_example_1: {
        stepId: 'step_example_1',
        mentorMessages: ['EXAMPLE 1 of 5: Browser Trust Store Inspection'],
        exampleBox: {
          exampleNumber: 1,
          title: 'Windows/macOS Root Trust Store',
          input: 'Operating System Pre-installed CA List',
          output: 'Contains ~150 Root CAs (DigiCert, ISRG Root X1, Sectigo, etc.)',
          explanation: 'Your browser trusts websites because their certificates chain back to one of these root authorities.',
        },
        options: [
          { label: '[ NEXT EXAMPLE ]', nextStepId: 'step_example_2' },
        ],
      },
      step_example_2: {
        stepId: 'step_example_2',
        mentorMessages: ['EXAMPLE 2 of 5: Validating Certificate Chain'],
        exampleBox: {
          exampleNumber: 2,
          title: 'Chain Verification Steps',
          input: 'Leaf Cert → Intermediate Cert → Root Cert',
          output: 'Step 1: Check Leaf signed by Inter ✓ | Step 2: Check Inter signed by Root ✓ | Step 3: Root in Trust Store ✓',
          explanation: 'If any link in the chain is missing or broken, the browser displays "NET::ERR_CERT_COMMON_NAME_INVALID".',
        },
        options: [
          { label: '[ NEXT EXAMPLE ]', nextStepId: 'step_example_3' },
        ],
      },
      step_example_3: {
        stepId: 'step_example_3',
        mentorMessages: ['EXAMPLE 3 of 5: Hardware Security Modules (HSM)'],
        exampleBox: {
          exampleNumber: 3,
          title: 'FIPS 140-2 Level 3 HSM Vault',
          input: 'Root CA Private Key stored inside physical tamper-proof ASIC',
          output: 'Key can NEVER be exported or read; only executes sign commands',
          explanation: 'Physical attempts to breach the HSM chip immediately trigger self-destruct zeroization.',
        },
        options: [
          { label: '[ NEXT EXAMPLE ]', nextStepId: 'step_example_4' },
        ],
      },
      step_example_4: {
        stepId: 'step_example_4',
        mentorMessages: ['EXAMPLE 4 of 5: Internal Enterprise PKI'],
        exampleBox: {
          exampleNumber: 4,
          title: 'Corporate Mutual TLS (mTLS)',
          input: 'Company issues internal CA certs to employee laptops',
          output: 'Zero Trust Network access granted only to devices with internal certs',
          explanation: 'Enterprise PKI secures internal microservices and corporate laptops.',
        },
        options: [
          { label: '[ NEXT EXAMPLE ]', nextStepId: 'step_example_5' },
        ],
      },
      step_example_5: {
        stepId: 'step_example_5',
        mentorMessages: ['EXAMPLE 5 of 5: OpenSSL Verify Command'],
        codeSnippet: {
          language: 'bash',
          code: `# Verify full certificate chain against root CA file
openssl verify -CAfile root_ca.pem -untrusted intermediate_ca.pem leaf_cert.pem`,
          caption: 'Verifying X.509 chain using OpenSSL CLI',
        },
        options: [
          { label: 'Summarize PKI', nextStepId: 'step_8_summary' },
          { label: 'Move to 13 TLS', nextStepId: 'GOTO:tls' },
        ],
      },
    },
  },

  tls: {
    id: 'tls',
    number: '13',
    title: 'TLS',
    keywords: ['tls', 'tls 1.3', 'ssl', 'https', 'handshake'],
    initialStepId: 'step_1_what',
    steps: {
      step_1_what: {
        stepId: 'step_1_what',
        mentorMessages: [
          'Lesson 13: Transport Layer Security (TLS 1.3).',
          'This is the culmination of everything you have learned in this curriculum.',
          'TLS combines Hashing, Symmetric Encryption, Asymmetric Encryption, HMAC/AEAD, CSPRNG, Digital Signatures, Certificates, Nonces, and ECDH into a single unified protocol securing the web.',
        ],
        options: [
          { label: 'Why does it exist?', nextStepId: 'step_2_why' },
          { label: 'How does TLS 1.3 work step-by-step?', nextStepId: 'step_3_how' },
          { label: 'Show me an example', nextStepId: 'step_example_1' },
        ],
      },
      step_2_why: {
        stepId: 'step_2_why',
        mentorMessages: [
          'Why TLS exists:',
          'TCP/IP streams travel unencrypted across dozens of routers, ISPs, and internet backbones.',
          'TLS provides an encrypted tunnel over TCP, transforming insecure HTTP into HTTPS.',
        ],
        options: [
          { label: 'How does TLS 1.3 work step-by-step?', nextStepId: 'step_3_how' },
          { label: 'What are the key terms?', nextStepId: 'step_4_terms' },
        ],
      },
      step_3_how: {
        stepId: 'step_3_how',
        mentorMessages: [
          'TLS 1.3 1-RTT Handshake Flow:',
          '1. Client Hello: Client sends supported cipher suites + ECDH KeyShare.',
          '2. Server Hello: Server selects cipher (TLS_AES_256_GCM_SHA384), sends Server ECDH KeyShare + X.509 Certificate + Signature.',
          '3. Key Derivation: Both derive AES-256 session keys locally via ECDH.',
          '4. Encrypted Data: All HTTP requests/responses travel over authenticated AES-GCM encryption!',
        ],
        options: [
          { label: 'What are the key terms?', nextStepId: 'step_4_terms' },
          { label: 'What security improvements are in TLS 1.3?', nextStepId: 'step_5_security' },
        ],
      },
      step_4_terms: {
        stepId: 'step_4_terms',
        mentorMessages: [
          'TLS 1.3 Terms:',
          '1. Handshake: Initial negotiation establishing keys.',
          '2. Cipher Suite: Combination of Key Exchange + Cipher + Hash (e.g. `TLS_AES_256_GCM_SHA384`).',
          '3. 1-RTT: Completed in just 1 network round-trip time.',
          '4. 0-RTT Resumption: Instant connection resumption for returning clients.',
        ],
        options: [
          { label: 'What are the security properties?', nextStepId: 'step_5_security' },
          { label: 'Show me an example', nextStepId: 'step_example_1' },
        ],
      },
      step_5_security: {
        stepId: 'step_5_security',
        mentorMessages: [
          'TLS 1.3 Security Enhancements:',
          '• Removed obsolete legacy algorithms (MD5, SHA-1, RC4, 3DES, static RSA key exchange).',
          '• Mandatory Perfect Forward Secrecy (ECDHE).',
          '• Encrypted Handshake: All handshake certificates are encrypted after Server Hello.',
        ],
        options: [
          { label: 'Where is TLS used in real life?', nextStepId: 'step_6_realworld' },
          { label: 'Show me an example', nextStepId: 'step_example_1' },
        ],
      },
      step_6_realworld: {
        stepId: 'step_6_realworld',
        mentorMessages: [
          'Real-world TLS applications:',
          '• 100% of HTTPS web traffic',
          '• Secure email transmission (STARTTLS)',
          '• Database connection encryption (PostgreSQL/MySQL SSL)',
          '• Mobile app API endpoints',
        ],
        options: [
          { label: 'What is a common misconception?', nextStepId: 'step_7_misconception' },
          { label: 'Show me an example', nextStepId: 'step_example_1' },
        ],
      },
      step_7_misconception: {
        stepId: 'step_7_misconception',
        mentorMessages: [
          'COMMON MISCONCEPTION:',
          '"SSL 3.0 and TLS 1.0 are still okay to support for old browsers."',
          'DANGER: SSL 3.0, TLS 1.0, and TLS 1.1 are completely broken by attacks like POODLE, BEAST, and CRIME. Modern servers MUST disable legacy SSL and enforce TLS 1.2 / TLS 1.3!',
        ],
        options: [
          { label: 'Show progressive examples', nextStepId: 'step_example_1' },
          { label: 'Summarize TLS & Complete Curriculum', nextStepId: 'step_8_summary' },
        ],
      },
      step_8_summary: {
        stepId: 'step_8_summary',
        mentorMessages: [
          'CURRICULUM COMPLETE — CONGRATULATIONS.',
          'You have mastered the foundational pillars of modern cryptography:',
          '01 Hashing → 02 Symmetric → 03 Asymmetric → 04 HMAC → 05 KDF → 06 CSPRNG → 07 Signatures → 08 Certificates → 09 Nonces → 10 Encoding → 11 ECDH → 12 PKI → 13 TLS.',
          'You now understand how privacy, integrity, and trust are engineered across the global internet.',
        ],
        options: [
          { label: 'Restart Curriculum (01 Hashing)', nextStepId: 'GOTO:hashing' },
          { label: 'Review TLS Examples', nextStepId: 'step_example_1' },
        ],
      },

      // EXAMPLES
      step_example_1: {
        stepId: 'step_example_1',
        mentorMessages: ['EXAMPLE 1 of 5: TLS 1.3 Handshake Timeline'],
        exampleBox: {
          exampleNumber: 1,
          title: '1-RTT Connection Speed',
          input: 'Client sends ClientHello + ECDH KeyShare in Packet 1',
          output: 'Server responds with ServerHello + Encrypted Handshake in Packet 2 → Connection established in 1 RTT!',
          explanation: 'TLS 1.3 reduced handshake latency by 50% compared to TLS 1.2.',
        },
        options: [
          { label: '[ NEXT EXAMPLE ]', nextStepId: 'step_example_2' },
        ],
      },
      step_example_2: {
        stepId: 'step_example_2',
        mentorMessages: ['EXAMPLE 2 of 5: Modern Cipher Suite Specification'],
        exampleBox: {
          exampleNumber: 2,
          title: 'TLS_AES_256_GCM_SHA384',
          input: 'Standard TLS 1.3 Cipher Suite',
          output: 'AEAD Cipher: AES-256-GCM | HKDF Hash: SHA-384 | Key Exchange: ECDHE',
          explanation: 'Clean, explicit, and uncompromised cipher composition.',
        },
        options: [
          { label: '[ NEXT EXAMPLE ]', nextStepId: 'step_example_3' },
        ],
      },
      step_example_3: {
        stepId: 'step_example_3',
        mentorMessages: ['EXAMPLE 3 of 5: Encrypted Handshake Packets'],
        exampleBox: {
          exampleNumber: 3,
          title: 'Eavesdropper Privacy Protection',
          input: 'Network Packet Sniffing during TLS 1.3 Handshake',
          output: 'Server Certificate & Extensions are ENCRYPTED on the wire',
          explanation: 'Eavesdroppers on public networks cannot see which specific certificate or domain extensions are being presented.',
        },
        options: [
          { label: '[ NEXT EXAMPLE ]', nextStepId: 'step_example_4' },
        ],
      },
      step_example_4: {
        stepId: 'step_example_4',
        mentorMessages: ['EXAMPLE 4 of 5: Testing Server TLS Grade'],
        exampleBox: {
          exampleNumber: 4,
          title: 'Qualys SSL Labs Benchmark',
          input: 'Enforce TLS 1.3 + HSTS + Strong Curves (P-256 / X25519)',
          output: 'Security Score: A+ Rating',
          explanation: 'Standard audit benchmark for enterprise web application security.',
        },
        options: [
          { label: '[ NEXT EXAMPLE ]', nextStepId: 'step_example_5' },
        ],
      },
      step_example_5: {
        stepId: 'step_example_5',
        mentorMessages: ['EXAMPLE 5 of 5: Curl TLS 1.3 Inspection Command'],
        codeSnippet: {
          language: 'bash',
          code: `# Test TLS 1.3 connection & print verbose handshake info
curl -vI --tls-max 1.3 https://api.encrypt-portal.io`,
          caption: 'Testing TLS 1.3 endpoint via curl command line',
        },
        options: [
          { label: 'Complete Curriculum Summary', nextStepId: 'step_8_summary' },
          { label: 'Restart Curriculum (01 Hashing)', nextStepId: 'GOTO:hashing' },
        ],
      },
    },
  },
};
