import type { Advocate } from "@/types/advocate";

const specialties = [
  'Bipolar',
  'LGBTQ',
  'Medication/Prescribing',
  'Suicide History/Attempts',
  'General Mental Health (anxiety, depression, stress, grief, life transitions)',
  "Men's issues",
  'Relationship Issues (family, friends, couple, etc)',
  'Trauma & PTSD',
  'Personality disorders',
  'Personal growth',
  'Substance use/abuse',
  'Pediatrics',
  "Women's issues (post-partum, infertility, family planning)",
  'Chronic pain',
  'Weight loss & nutrition',
  'Eating disorders',
  'Diabetic Diet and nutrition',
  'Coaching (leadership, career, academic and wellness)',
  'Life coaching',
  'Obsessive-compulsive disorders',
  'Neuropsychological evaluations & testing (ADHD testing)',
  'Attention and Hyperactivity (ADHD)',
  'Sleep issues',
  'Schizophrenia and psychotic disorders',
  'Learning disorders',
  'Domestic abuse',
];

const randomSpecialty = () => {
  const specialtiesCount = specialties.length;
  const random1 = Math.floor(Math.random() * specialtiesCount);
  const random2 =
    Math.floor(Math.random() * (specialtiesCount - random1)) + random1 + 1;

  return [random1, random2];
};

function generateFakePhoneNumber(index: number) {
  const middle = 100 + (index % 800); // 100–899
  const last = 1000 + ((index * 37) % 9000); // Add more randomness
  return Number(`555${middle}${last}`);
}

const cities = [
  'New York',
  'Los Angeles',
  'Chicago',
  'Houston',
  'Phoenix',
  'Philadelphia',
  'San Antonio',
  'San Diego',
  'Dallas',
  'San Jose',
  'Austin',
  'Jacksonville',
  'San Francisco',
  'Columbus',
  'Fort Worth',
];
const degrees = ['MD', 'PhD', 'MSW'];
const firstNames = [
  'John',
  'Jonathan',
  'Jon',
  'Jane',
  'Janet',
  'Janice',
  'James',
  'Jamie',
  'Jim',
  'Jimmy',
  'Jessica',
  'Jess',
  'Jessie',
  'Josh',
  'Joshua',
  'Joseph',
  'Joey',
  'Jill',
  'Julia',
  'Julie',
];
const lastNames = [
  'Doe',
  'Smith',
  'Johnson',
  'Brown',
  'Davis',
  'Martinez',
  'Taylor',
  'Harris',
  'Clark',
  'Lewis',
  'Lee',
  'King',
  'Green',
  'Walker',
  'Hall',
];

const advocateData: Omit<Advocate, 'id' | 'createdAt'>[] = Array.from(
  { length: 250 },
  (_, i) => ({
    firstName:
      firstNames[Math.floor(Math.random() * firstNames.length)] || 'John',
    lastName: lastNames[Math.floor(Math.random() * lastNames.length)] || 'Doe',
    city: cities[Math.floor(Math.random() * cities.length)] || 'New York',
    degree: degrees[Math.floor(Math.random() * degrees.length)] || 'MD',
    specialties: specialties.slice(...randomSpecialty()),
    yearsOfExperience: Math.floor(Math.random() * 20) + 1,
    phoneNumber: generateFakePhoneNumber(i),
  })
);

export { advocateData };
