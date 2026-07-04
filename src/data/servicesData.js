export const servicesData = [
  {
    id: "dental-checkup",
    title: "Dental Checkup",
    category: "General",
    icon: "ClipboardCheck",
    summary: "Comprehensive oral examinations, diagnostic X-rays, and customized treatment planning.",
    description: "Keep your teeth and gums in optimal health with our regular comprehensive dental screenings. We use state-of-the-art diagnostic equipment to identify early signs of tooth decay, gum disease, and other oral health issues.",
    details: {
      overview: "A comprehensive dental checkup is the foundation of long-term oral health. Dr. Kriti Ghagre performs a meticulous physical examination of your teeth, gums, tongue, and jaw. Using low-radiation digital X-rays and intraoral cameras, we look beneath the surface to identify concerns long before they cause pain.",
      duration: "30 - 45 Mins",
      priceRange: "$50 - $120",
      steps: [
        "Visual examination of teeth and gums",
        "Digital dental X-rays (if required)",
        "Oral cancer screening",
        "Bite & jaw alignment assessment",
        "Personalized consultation and treatment roadmap"
      ],
      recoveryTips: [
        "No immediate downtime is required.",
        "Maintain routine brushing and flossing twice daily.",
        "Schedule your follow-up checkup in 6 months."
      ]
    }
  },
  {
    id: "dental-cleaning",
    title: "Dental Cleaning",
    category: "General",
    icon: "Sparkles",
    summary: "Professional scaling, polishing, and plaque removal for a fresh, bright smile.",
    description: "Eliminate stubborn tartar, plaque, and surface stains that regular brushing misses. Our hygienic dental cleaning process helps prevent cavities and gum disease while leaving your mouth feeling exceptionally fresh.",
    details: {
      overview: "Also known as prophylaxis, professional dental cleaning involves removing mineralized plaque (calculus or tartar) that deposits on teeth over time. Even with careful home care, tartar can build up in hard-to-reach areas. Our dental hygienists use advanced ultrasonic scalers to gently lift tartar away.",
      duration: "45 - 60 Mins",
      priceRange: "$80 - $180",
      steps: [
        "Ultrasonic scaling to remove tartar and plaque",
        "Fine hand scaling for detail cleaning",
        "Air polishing to lift surface stains",
        "Professional flossing between all teeth",
        "Fluoride treatment (optional) to strengthen enamel"
      ],
      recoveryTips: [
        "Avoid eating or drinking colored beverages for 30 minutes post-treatment.",
        "Expect mild gum sensitivity for 24 hours.",
        "Use a soft-bristled brush for your next clean."
      ]
    }
  },
  {
    id: "dental-filling",
    title: "Dental Filling",
    category: "General",
    icon: "Shield",
    summary: "Tooth-colored composite restorations to repair cavities and minor fractures.",
    description: "Restore damaged or decayed teeth back to their natural form and function using durable, tooth-colored composite resins that blend seamlessly with your smile.",
    details: {
      overview: "Gone are the days of silver amalgam fillings. At The Golden Tooth, we utilize high-density composite resins that are color-matched perfectly to your natural enamel. These fillings bond chemically to your tooth structure, reinforcing the tooth and preventing future decay.",
      duration: "30 - 60 Mins (per tooth)",
      priceRange: "$100 - $250",
      steps: [
        "Local anesthesia to ensure a pain-free experience",
        "Removal of decayed or damaged tooth structure",
        "Tooth conditioning and bonding agent application",
        "Layering and shaping of color-matched composite resin",
        "Curing with a specialized UV light and bite adjustment"
      ],
      recoveryTips: [
        "Avoid chewing on the treated side until the local anesthetic wears off completely.",
        "Expect minor sensitivity to cold/hot temperatures for a few days.",
        "Contact us if your bite feels uneven after 48 hours."
      ]
    }
  },
  {
    id: "root-canal-treatment",
    title: "Root Canal Treatment",
    category: "Specialized",
    icon: "Activity",
    summary: "Pain-free therapy to save infected or severely damaged teeth.",
    description: "Relieve severe toothaches and save your natural tooth from extraction. Our modern, pain-free root canal procedures remove infected pulp tissue and seal the tooth securely.",
    details: {
      overview: "Root canal therapy (endodontic treatment) is required when the soft inner tissue of your tooth (pulp) becomes infected due to deep decay or trauma. Using microscopic precision and modern local anesthetics, we make this procedure as comfortable and pain-free as a standard filling.",
      duration: "60 - 90 Mins (1 to 2 visits)",
      priceRange: "$400 - $900",
      steps: [
        "Administering local anesthesia for complete numbness",
        "Creating a microscopic opening in the tooth crown",
        "Thorough cleaning and disinfection of infected pulp and canals",
        "Shaping and filling the root canals with gutta-percha",
        "Sealing the tooth temporarily before placing a permanent crown"
      ],
      recoveryTips: [
        "Avoid chewing on the treated tooth until the final permanent crown is placed.",
        "Take prescribed anti-inflammatory medication to manage mild post-procedure soreness.",
        "Keep the area clean but brush gently around the temporary seal."
      ]
    }
  },
  {
    id: "tooth-extraction",
    title: "Tooth Extraction",
    category: "Specialized",
    icon: "Scissors",
    summary: "Safe, gentle removal of unsavable, crowded, or impacted wisdom teeth.",
    description: "When a tooth cannot be saved due to extensive decay, trauma, or severe crowding, our dental team performs safe, comfortable, and minimally invasive extractions.",
    details: {
      overview: "Extracting a tooth is always our last resort. However, when necessary, we ensure the procedure is clean, rapid, and stress-free. We also offer guidance on modern tooth replacement options (like implants or bridges) to keep your smile complete.",
      duration: "30 - 60 Mins",
      priceRange: "$150 - $400",
      steps: [
        "Numbing the area thoroughly with advanced local anesthesia",
        "Gently luxating and loosening the tooth structure",
        "Clean extraction using specialized atraumatic instruments",
        "Disinfecting the socket and placing sterile gauze to promote clotting",
        "Providing detailed post-operative healing guides"
      ],
      recoveryTips: [
        "Bite firmly on the gauze pad for 30–45 minutes to stop bleeding.",
        "Do not drink through a straw, spit, or smoke for 48 hours to avoid dry socket.",
        "Eat soft foods and apply an ice pack to the cheek to reduce swelling."
      ]
    }
  },
  {
    id: "dental-implants",
    title: "Dental Implants",
    category: "Cosmetic",
    icon: "Layers",
    summary: "Permanent, natural-looking replacement for missing teeth.",
    description: "Restore your smile's function, strength, and aesthetic appeal with medical-grade titanium dental implants that look, feel, and function exactly like natural teeth.",
    details: {
      overview: "Dental implants are the gold standard for tooth replacement. An implant consists of a titanium post placed into the jawbone, acting as a root. Once integrated, a custom porcelain crown is attached. This maintains jaw bone structure and prevents adjacent teeth from shifting.",
      duration: "Multiple stages (over 3 - 6 months)",
      priceRange: "$1,500 - $3,500",
      steps: [
        "Detailed 3D CT scan and planning consult",
        "Surgical placement of titanium implant post under anesthesia",
        "Osseointegration phase (implant fuses with jawbone over 3-4 months)",
        "Abutment placement on the post",
        "Fabrication and attachment of the custom ceramic/porcelain crown"
      ],
      recoveryTips: [
        "Maintain a soft-food diet for the first week after surgical steps.",
        "Avoid strenuous physical activities for 48 hours after surgery.",
        "Practice excellent oral hygiene and attend all scheduled integration checks."
      ]
    }
  },
  {
    id: "smile-designing",
    title: "Smile Designing",
    category: "Cosmetic",
    icon: "Smile",
    summary: "Complete aesthetic smile makeovers combining veneers, crowns, and contours.",
    description: "Achieve the perfect, balanced smile of your dreams. Our custom smile makeovers utilize advanced digital planning to correct alignment, shape, color, and spacing.",
    details: {
      overview: "Smile designing blends cosmetic dentistry science with artistic symmetry. Dr. Kriti Ghagre analyzes your facial features, skin tone, lip line, and tooth dimensions to design a custom blueprint. Using porcelain veneers, gum contouring, and bonding, we craft a radiant smile.",
      duration: "2 - 3 visits (over 2 - 4 weeks)",
      priceRange: "$2,000 - $6,000",
      steps: [
        "Aesthetic evaluation, digital photography, and 3D modeling",
        "Mock-up demonstration to preview your smile before committing",
        "Minimal preparation of teeth and creation of temporary restorations",
        "Fabrication of premium veneers/crowns in our cosmetic lab",
        "Bonding the custom restorations and adjusting bite for ultimate comfort"
      ],
      recoveryTips: [
        "Avoid biting directly into extremely hard items (like ice or hard candy) with veneers.",
        "Use a non-abrasive fluoride toothpaste.",
        "Wear a nightguard if you have a habit of grinding your teeth (bruxism)."
      ]
    }
  },
  {
    id: "teeth-whitening",
    title: "Teeth Whitening",
    category: "Cosmetic",
    icon: "Sun",
    summary: "Advanced in-office gel bleaching to brighten your smile up to 8 shades.",
    description: "Remove deep discoloration caused by coffee, wine, aging, or tobacco. Our clinical teeth whitening treatments are fast, safe, and highly effective.",
    details: {
      overview: "Over-the-counter whitening kits often yield uneven results and cause tooth sensitivity. Our in-office whitening treatments utilize professional-grade hydrogen peroxide gels activated by a specialized cool light source. This breaks up deep intrinsic stains safely without damaging enamel.",
      duration: "45 - 60 Mins",
      priceRange: "$250 - $500",
      steps: [
        "Shade mapping to establish current tooth color",
        "Applying a protective barrier to gums and soft tissues",
        "Applying professional whitening gel to tooth surfaces",
        "Activation under LED laser light (three 15-minute cycles)",
        "Post-treatment fluoride rinse to eliminate sensitivity"
      ],
      recoveryTips: [
        "Follow the 'White Diet' (no coffee, red wine, soy sauce, or berries) for 48 hours.",
        "Avoid extremely hot or freezing drinks for 24 hours.",
        "Use a desensitizing toothpaste if temporary sensitivity occurs."
      ]
    }
  },
  {
    id: "dental-crown",
    title: "Dental Crown",
    category: "Cosmetic",
    icon: "Crown",
    summary: "Custom caps designed to restore, strengthen, and protect damaged teeth.",
    description: "Protect weakened teeth, restore worn-down enamel, or cap root canals with custom-milled, highly durable zirconium or porcelain crowns.",
    details: {
      overview: "A dental crown acts as a protective shield covering a tooth that has been weakened by decay, fracture, or root canal therapy. We offer premium metal-free options like Zirconia and E-Max porcelain, which replicate the translucent shine of natural teeth while offering superior strength.",
      duration: "2 visits (over 1 - 2 weeks)",
      priceRange: "$500 - $1,200",
      steps: [
        "Tooth shaping and preparation under local anesthesia",
        "Digital scanning or putty impression of the prepared tooth",
        "Placement of a custom temporary crown for protection",
        "Milling of the permanent crown in the laboratory",
        "Removal of temporary crown, fitting, and permanent cementation"
      ],
      recoveryTips: [
        "Avoid sticky, chewy foods around the temporary crown.",
        "Floss carefully (slide the floss out, do not pull up) around the temporary.",
        "Maintain normal brushing and flossing once the permanent crown is bonded."
      ]
    }
  },
  {
    id: "braces",
    title: "Orthodontic Braces",
    category: "Specialized",
    icon: "Grid",
    summary: "Traditional metal and ceramic braces to align teeth and correct bites.",
    description: "Correct crowded teeth, gaps, overbites, and underbites. We offer traditional metal and modern ceramic (clear) braces tailored for teens and adults.",
    details: {
      overview: "Orthodontics is not just about aesthetics; it corrects bite issues that cause uneven wear, jaw pain (TMJ), and cleaning challenges. Our modern bracket systems are smaller, less visible, and more comfortable than ever, applying gentle, continuous force to guide teeth into perfect alignment.",
      duration: "12 - 24 months (with monthly checkups)",
      priceRange: "$2,000 - $4,500",
      steps: [
        "Orthodontic consult with facial photos, X-rays, and molds",
        "Teeth cleaning and prep for bracket bonding",
        "Placement of brackets and archwires",
        "Regular adjustment appointments (every 4-6 weeks)",
        "Removal of braces and placement of custom retainers"
      ],
      recoveryTips: [
        "Avoid sticky, hard, or crunchy foods that can break brackets.",
        "Use orthodontic wax to soothe cheeks if brackets cause irritation.",
        "Use specialized interdental brushes to clean meticulously around wires."
      ]
    }
  },
  {
    id: "invisible-aligners",
    title: "Invisible Aligners",
    category: "Cosmetic",
    icon: "Compass",
    summary: "Clear, removable trays to align your teeth discreetly and comfortably.",
    description: "Straighten your teeth without the hassle of metal brackets. Clear, custom aligners are virtually invisible, comfortable, and removable for easy eating and brushing.",
    details: {
      overview: "Clear aligner therapy uses a series of transparent, medical-grade thermoplastic trays to incrementally shift teeth. Because they are removable, you can maintain your normal diet and oral hygiene routine. They are perfect for working professionals and image-conscious adults.",
      duration: "6 - 18 months",
      priceRange: "$3,000 - $5,500",
      steps: [
        "3D digital scanning of your arches (no messy putty)",
        "Virtual treatment projection showing your future smile progression",
        "Fabrication of custom clear aligner sets",
        "Fitting of initial aligners and placement of attachments (if needed)",
        "Transitioning to new aligner trays every 1-2 weeks at home"
      ],
      recoveryTips: [
        "Wear your aligners for at least 20 - 22 hours every single day.",
        "Remove aligners when eating or drinking anything other than plain water.",
        "Clean aligners daily with lukewarm water and a soft toothbrush."
      ]
    }
  },
  {
    id: "kids-dentistry",
    title: "Kids Dentistry",
    category: "Kids",
    icon: "Baby",
    summary: "Gentle, friendly, and fear-free dental care designed specifically for children.",
    description: "Start your child's dental journey on a happy note. We offer cavity preventions, sealants, fluoride treatments, and gentle care in a fun, reassuring environment.",
    details: {
      overview: "Pediatric dentistry focuses on tracking oral development and building positive habits. Dr. Kriti Ghagre uses positive reinforcement and kid-friendly terminology. We focus on preventive care, including cavity-sealing sealants and enamel-strengthening fluoride applications.",
      duration: "30 - 45 Mins",
      priceRange: "$40 - $120",
      steps: [
        "Warm, interactive introduction to reduce dental anxiety",
        "Gentle visual check of tooth eruption and jaw development",
        "Light cleaning and scaling if necessary",
        "Dental sealants application to deep fissures (preventive)",
        "Fun, easy brushing tutorials for the child and parents"
      ],
      recoveryTips: [
        "Supervise your child's brushing twice a day using a pea-sized amount of fluoride paste.",
        "Limit sugary juices and sticky candies, especially between meals.",
        "Keep visits positive and avoid sharing scary dental stories."
      ]
    }
  },
  {
    id: "gum-treatment",
    title: "Gum Treatment",
    category: "Specialized",
    icon: "HeartPulse",
    summary: "Deep scaling, root planing, and therapy for bleeding, sensitive gums.",
    description: "Address gum bleeding, bad breath, and receding gums. Our periodontal treatments stop gum disease (gingivitis/periodontitis) in its tracks to protect your bone support.",
    details: {
      overview: "Gum disease is the leading cause of tooth loss in adults. It starts as gingivitis (bleeding gums) and can progress to periodontitis, which destroys the bone supporting your teeth. Our deep cleaning treatment (scaling and root planing) cleans beneath the gumline to eradicate harmful bacteria.",
      duration: "45 - 90 Mins (may require multiple quadrant sessions)",
      priceRange: "$200 - $600",
      steps: [
        "Periodontal probing to measure pocket depths around teeth",
        "Subgingival scaling to remove calculus under the gum line",
        "Root planing to smooth root surfaces so gums can reattach",
        "Local antimicrobial irrigation to kill remaining bacteria",
        "Follow-up measurement checks after 4 - 6 weeks"
      ],
      recoveryTips: [
        "Rinse with warm salt water 2-3 times daily for a few days to soothe healing gums.",
        "Avoid eating spicy, sharp, or extremely hot food for 48 hours.",
        "Use an antimicrobial mouthwash if recommended by Dr. Kriti."
      ]
    }
  },
  {
    id: "dentures",
    title: "Dentures & Partials",
    category: "Specialized",
    icon: "Smile",
    summary: "High-quality partial and full removable dentures to restore chewing and speech.",
    description: "Regain your smile and chewing ability after tooth loss. We construct comfortable, natural-looking complete and partial dentures designed to fit securely.",
    details: {
      overview: "Modern dentures are lighter, more lifelike, and much more comfortable than older options. Whether you need partial dentures to fill specific gaps or complete dentures to restore an entire arch, we construct them using high-grade acrylics and ceramics that mimic natural gum tissue and teeth.",
      duration: "3 - 5 visits (over 3 - 5 weeks)",
      priceRange: "$800 - $2,000",
      steps: [
        "Detailed oral impressions and jaw relation measurements",
        "Wax model creation for initial fitting and cosmetic approval",
        "Laboratory fabrication of custom denture plates",
        "Final fitting, bite balancing, and custom adjustments",
        "Post-delivery follow-ups for relieving soft pressure spots"
      ],
      recoveryTips: [
        "Remove dentures at night to give your gum tissues a chance to rest.",
        "Clean dentures daily with a specialized denture brush and soaking solution.",
        "Expect a short adaptation phase for speaking and chewing (start with soft foods)."
      ]
    }
  },
  {
    id: "emergency-care",
    title: "Emergency Dental Care",
    category: "Specialized",
    icon: "AlertTriangle",
    summary: "Immediate, priority treatment for toothaches, accidents, and broken teeth.",
    description: "Suffering from a severe toothache, knocked-out tooth, or dental fracture? Contact us immediately for rapid relief and priority emergency care.",
    details: {
      overview: "Dental emergencies are stressful and require immediate attention. We reserve emergency slots in our daily schedule. Whether you have a severe throbbing abscess, a cracked crown, or a sports injury, Dr. Kriti Ghagre will diagnose and relieve your pain promptly.",
      duration: "Variable (Immediate relief focus)",
      priceRange: "$100 - $300 (Initial relief/diagnostic)",
      steps: [
        "Priority intake and instant visual check",
        "Targeted digital X-ray to diagnose the root cause",
        "Immediate pain relief (anesthesia, draining, or temporary dressing)",
        "Treatment execution (e.g. extraction, emergency root canal, or recementing)",
        "Prescribing antibiotics/pain relievers and planning full restoration"
      ],
      recoveryTips: [
        "Take all prescribed medications strictly as directed.",
        "If a tooth was knocked out, keep it moist in milk and see us within 60 minutes.",
        "Stick to soft, cool foods and avoid putting pressure on the emergency site."
      ]
    }
  }
];
