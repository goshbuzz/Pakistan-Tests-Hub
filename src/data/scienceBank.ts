import { MCQ } from "@/lib/types";

function q(
  subject: string,
  topic: string,
  question_text: string,
  options: string[],
  correct_answer: number,
  explanation: string,
  difficulty: MCQ["difficulty"]
): Omit<MCQ, "id" | "test_id"> {
  return {
    kind: "mcq",
    subject,
    topic,
    question_text,
    options,
    correct_answer,
    explanation,
    difficulty,
    source: "official",
  };
}

export const SCIENCE: Omit<MCQ, "id" | "test_id">[] = [
  q("Biology", "Cell", "Ribosomes are the site of:", ["Photosynthesis", "Protein synthesis", "Lipid storage", "DNA replication"], 1, "Translation occurs on ribosomes.", "easy"),
  q("Biology", "Cell", "Which organelle contains hydrolytic enzymes?", ["Lysosome", "Chloroplast", "Centriole", "Nucleolus"], 0, "Lysosomes digest macromolecules.", "medium"),
  q("Biology", "Enzymes", "Enzymes are mainly:", ["Lipids", "Proteins", "Nucleic acids", "Minerals"], 1, "Most enzymes are proteins.", "easy"),
  q("Biology", "Genetics", "A haploid human gamete has chromosomes:", ["23", "46", "22", "44"], 0, "n = 23.", "easy"),
  q("Biology", "Genetics", "Transcription produces:", ["DNA from DNA", "RNA from DNA", "Protein from RNA", "DNA from RNA"], 1, "DNA → RNA.", "medium"),
  q("Biology", "Physiology", "The pacemaker of the heart is the:", ["AV node", "SA node", "Bundle of His", "Purkinje fibres only"], 1, "Sino-atrial node.", "medium"),
  q("Biology", "Physiology", "Nephron’s filtration occurs mainly at the:", ["Loop of Henle", "Glomerulus", "Ureter", "Collecting duct only"], 1, "Glomerular filtrate.", "easy"),
  q("Biology", "Ecology", "Primary producers in most ecosystems are:", ["Herbivores", "Green plants / algae", "Fungi", "Carnivores"], 1, "Photosynthetic autotrophs.", "easy"),
  q("Biology", "Diversity", "Bacteria are:", ["Eukaryotes", "Prokaryotes", "Viruses", "Fungi"], 1, "No true nucleus.", "easy"),
  q("Biology", "Biotech", "PCR is used to:", ["Sequence protein", "Amplify DNA", "Make ATP", "Digest starch"], 1, "Polymerase chain reaction.", "hard"),
  q("Chemistry", "Atomic", "Isotopes have the same:", ["Mass number", "Atomic number", "Neutron number always", "Density"], 1, "Same Z, different A.", "easy"),
  q("Chemistry", "Bonding", "A covalent bond is formed by:", ["Transfer of electrons", "Sharing of electrons", "Metallic lattice only", "Hydrogen bonding only"], 1, "Shared pair.", "easy"),
  q("Chemistry", "Mole", "Moles in 18 g of H₂O (M=18):", ["0.5", "1", "2", "18"], 1, "n = m/M = 1.", "easy"),
  q("Chemistry", "Gas", "Ideal gas law is:", ["PV = nRT", "P = ρgh", "F = ma", "E = hf"], 0, "PV=nRT.", "easy"),
  q("Chemistry", "Equilibrium", "Le Chatelier: adding product generally:", ["Shifts forward", "Shifts reverse", "Stops reaction", "Changes K always instantly"], 1, "System consumes extra product.", "medium"),
  q("Chemistry", "Acid", "A Brønsted–Lowry acid:", ["Accepts H+", "Donates H+", "Donates electron pair", "Is always organic"], 1, "Proton donor.", "medium"),
  q("Chemistry", "Organic", "Functional group of alcohols is:", ["–CHO", "–COOH", "–OH", "–NH₂"], 2, "Hydroxyl.", "easy"),
  q("Chemistry", "Organic", "Benzene’s typical reactions are:", ["Electrophilic addition only", "Electrophilic substitution", "Nucleophilic substitution only", "Free-radical halogenation of ring first"], 1, "Aromatic substitution.", "hard"),
  q("Chemistry", "Electro", "Oxidation is:", ["Gain of electrons", "Loss of electrons", "Gain of protons", "Decrease in oxidation number always"], 1, "Loss of e⁻.", "medium"),
  q("Chemistry", "Thermo", "Endothermic reactions have ΔH:", ["Negative", "Positive", "Zero always", "Undefined"], 1, "Heat absorbed.", "easy"),
  q("Physics", "Kinematics", "SI unit of acceleration:", ["m/s", "m/s²", "N", "J"], 1, "Change of velocity per second.", "easy"),
  q("Physics", "Newton", "Newton’s third law:", ["F=ma", "Action–reaction pairs", "Inertia", "Impulse = Δp only"], 1, "Equal opposite forces.", "easy"),
  q("Physics", "Energy", "Kinetic energy is:", ["mgh", "½mv²", "Fd only", "qV"], 1, "½mv².", "easy"),
  q("Physics", "Waves", "Frequency × wavelength equals:", ["Period", "Wave speed", "Amplitude", "Intensity"], 1, "v = fλ.", "easy"),
  q("Physics", "Heat", "First law of thermodynamics:", ["ΔU = Q − W (sign convention)", "Entropy always decreases", "Heat cannot convert to work", "Temperature is energy"], 0, "Energy conservation for a system.", "medium"),
  q("Physics", "Optics", "A concave mirror can form a real image if object is:", ["At the pole only", "Beyond focus (typical)", "Inside a plane mirror", "Always virtual"], 1, "Object beyond F.", "medium"),
  q("Physics", "Electric", "Current is the flow of:", ["Charge per time", "Mass per time", "Force per charge", "Energy per mass"], 0, "I = ΔQ/Δt.", "easy"),
  q("Physics", "Electric", "Capacitance of a parallel plate increases if:", ["Area decreases", "Distance increases", "Dielectric inserted (κ>1)", "Charge is removed only"], 2, "C = κε₀A/d.", "hard"),
  q("Physics", "Modern", "Photon energy is:", ["hf", "mc only", "½mv² always", "kT only"], 0, "E=hf.", "medium"),
  q("Physics", "Nuclear", "Alpha particle is:", ["Electron", "Helium nucleus", "Photon", "Neutron"], 1, "He²⁺.", "easy"),
  q("Logical Reasoning", "Assumption", "If all roses are flowers and some flowers fade quickly, then “all roses fade quickly” is:", ["Certain", "Impossible", "Not necessarily true", "A definition"], 2, "Some ≠ all.", "medium"),
  q("Logical Reasoning", "Cause", "Heavy rain often precedes flooding. This relation is best called:", ["Necessary identity", "Possible cause–effect", "Contradiction", "Tautology"], 1, "Correlation with causal mechanism.", "easy"),
  q("Logical Reasoning", "Series", "2, 6, 12, 20, 30, ?", ["36", "40", "42", "44"], 2, "+4,+6,+8,+10,+12.", "medium"),
  q("Logical Reasoning", "Statement", "Course of action should be:", ["Irrelevant to the problem", "Practical and related", "Always illegal", "Always expensive"], 1, "Standard LR keying.", "easy"),
  q("Intelligence", "Pattern", "Next in ○△○△○ ?", ["○", "△", "□", "●"], 1, "Alternating shapes.", "easy"),
  q("Mathematics", "Functions", "If f(x)=2x+1, f(3)=", ["5", "6", "7", "8"], 2, "6+1=7.", "easy"),
  q("Mathematics", "Differentiation", "d/dx (x³) =", ["x²", "3x²", "3x", "x³"], 1, "Power rule.", "easy"),
  q("Mathematics", "Trig", "cos 60° =", ["0", "1/2", "√3/2", "1"], 1, "1/2.", "easy"),
  q("Mathematics", "Matrices", "Order of a 2×3 matrix:", ["2×3", "3×2", "6×1", "5"], 0, "Rows × columns.", "medium"),
  q("Computer", "Logic", "Binary of decimal 5 is:", ["101", "110", "011", "100"], 0, "4+1.", "easy"),
  q("Biology", "Cell", "Mitochondria are inherited in humans mainly from:", ["father", "mother", "equal both", "diet only"], 1, "Maternal mtDNA.", "medium"),
  q("Biology", "Genetics", "A test-cross uses:", ["TT × TT", "tt × unknown dominant phenotype", "two heterozygotes only", "cloning"], 1, "Recessive tester.", "hard"),
  q("Biology", "Physiology", "ADH mainly acts on the:", ["alveoli", "collecting ducts", "spleen", "retina"], 1, "Water reabsorption.", "medium"),
  q("Biology", "Immunity", "Antibodies are produced by:", ["neutrophils only", "plasma cells (B lineage)", "erythrocytes", "osteocytes"], 1, "Humoral immunity.", "medium"),
  q("Chemistry", "Mole", "Number of moles in 11.2 L of an ideal gas at STP (approx 22.4 L/mol):", ["0.25", "0.5", "1", "2"], 1, "11.2/22.4=0.5.", "medium"),
  q("Chemistry", "Organic", "Markovnikov addition of HBr to propene mainly gives:", ["1-bromopropane", "2-bromopropane", "propane", "benzene"], 1, "2-bromopropane.", "hard"),
  q("Chemistry", "Periodic", "Electronegativity across a period generally:", ["decreases", "increases", "is random", "is zero"], 1, "Towards fluorine.", "easy"),
  q("Physics", "SHM", "In SHM, acceleration is proportional to:", ["velocity squared", "displacement towards mean", "mass only", "temperature"], 1, "a = −ω²x.", "medium"),
  q("Physics", "Magnetism", "Force on a charge in a magnetic field is maximum when v is:", ["parallel to B", "perpendicular to B", "zero always", "anti-parallel only"], 1, "F=qvB sinθ.", "medium"),
  q("Physics", "Modern", "Photoelectric effect shows light as:", ["only wave always", "quantised photons", "sound", "gravity"], 1, "Einstein photoelectric.", "medium"),
  q("Logical Reasoning", "Assumption", "“Ban plastic bags to cut pollution.” An underlying assumption is that:", ["plastic is metal", "bags contribute to pollution", "bans never work", "air is nitrogen only"], 1, "Causal assumption.", "easy"),
];

export function scienceFor(allowed: string[]): Omit<MCQ, "id" | "test_id">[] {
  const low = allowed.map((a) => a.toLowerCase());
  return SCIENCE.filter((s) =>
    low.some((a) => s.subject.toLowerCase() === a || a.includes(s.subject.toLowerCase()) || s.subject.toLowerCase().includes(a.split(" ")[0]))
  );
}
