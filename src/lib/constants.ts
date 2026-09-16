export const SURVEY_SECTIONS = [
  "Demographics",
  "Anthropometry",
  "Dietary Intake",
  "Economic Access",
  "Awareness",
  "Barriers",
];

export const SURVEY_QUESTIONS = {
  demographics: [
    {
      id: "age",
      label: "Age (years)",
      type: "number",
      required: true,
      min: 6,
      max: 18,
    },
    {
      id: "sex",
      label: "Sex",
      type: "select",
      required: true,
      options: [
        { value: "M", label: "Male" },
        { value: "F", label: "Female" },
        { value: "O", label: "Other" },
      ],
    },
    {
      id: "school",
      label: "School Name",
      type: "text",
      required: false,
    },
    {
      id: "grade",
      label: "Grade",
      type: "select",
      required: true,
      options: [
        { value: "1", label: "Grade 1" },
        { value: "2", label: "Grade 2" },
        { value: "3", label: "Grade 3" },
        { value: "4", label: "Grade 4" },
        { value: "5", label: "Grade 5" },
        { value: "6", label: "Grade 6" },
        { value: "7", label: "Grade 7" },
        { value: "8", label: "Grade 8" },
        { value: "9", label: "Grade 9" },
        { value: "10", label: "Grade 10" },
      ],
    },
  ],

  anthropometry: [
    {
      id: "height_cm",
      label: "Height (cm)",
      type: "number",
      required: true,
      min: 80,
      max: 220,
    },
    {
      id: "weight_kg",
      label: "Weight (kg)",
      type: "number",
      required: true,
      min: 10,
      max: 150,
    },
  ],

  dietary: [
    {
      id: "fg_grains",
      label: "How often do you eat grains, roots, tubers? (rice, roti, potato)",
      type: "select",
      required: true,
      options: [
        { value: "Never", label: "Never" },
        { value: "1-2 days/week", label: "1-2 days/week" },
        { value: "3-4 days/week", label: "3-4 days/week" },
        { value: "5+ days/week", label: "5+ days/week" },
      ],
    },
    {
      id: "fg_pulses",
      label: "How often do you eat pulses/legumes? (dal, beans, chana)",
      type: "select",
      required: true,
      options: [
        { value: "Never", label: "Never" },
        { value: "1-2 days/week", label: "1-2 days/week" },
        { value: "3-4 days/week", label: "3-4 days/week" },
        { value: "5+ days/week", label: "5+ days/week" },
      ],
    },
    {
      id: "fg_nuts",
      label: "How often do you eat nuts & seeds?",
      type: "select",
      required: true,
      options: [
        { value: "Never", label: "Never" },
        { value: "1-2 days/week", label: "1-2 days/week" },
        { value: "3-4 days/week", label: "3-4 days/week" },
        { value: "5+ days/week", label: "5+ days/week" },
      ],
    },
    {
      id: "fg_dairy",
      label: "How often do you eat dairy? (milk, curd, paneer)",
      type: "select",
      required: true,
      options: [
        { value: "Never", label: "Never" },
        { value: "1-2 days/week", label: "1-2 days/week" },
        { value: "3-4 days/week", label: "3-4 days/week" },
        { value: "5+ days/week", label: "5+ days/week" },
      ],
    },
    {
      id: "fg_eggs",
      label: "How often do you eat eggs?",
      type: "select",
      required: true,
      options: [
        { value: "Never", label: "Never" },
        { value: "1-2 days/week", label: "1-2 days/week" },
        { value: "3-4 days/week", label: "3-4 days/week" },
        { value: "5+ days/week", label: "5+ days/week" },
      ],
    },
    {
      id: "fg_meatfish",
      label: "How often do you eat meat, fish, poultry?",
      type: "select",
      required: true,
      options: [
        { value: "Never", label: "Never" },
        { value: "1-2 days/week", label: "1-2 days/week" },
        { value: "3-4 days/week", label: "3-4 days/week" },
        { value: "5+ days/week", label: "5+ days/week" },
      ],
    },
    {
      id: "fg_greens",
      label: "How often do you eat dark green leafy vegetables?",
      type: "select",
      required: true,
      options: [
        { value: "Never", label: "Never" },
        { value: "1-2 days/week", label: "1-2 days/week" },
        { value: "3-4 days/week", label: "3-4 days/week" },
        { value: "5+ days/week", label: "5+ days/week" },
      ],
    },
    {
      id: "fg_othveg",
      label: "How often do you eat other vegetables?",
      type: "select",
      required: true,
      options: [
        { value: "Never", label: "Never" },
        { value: "1-2 days/week", label: "1-2 days/week" },
        { value: "3-4 days/week", label: "3-4 days/week" },
        { value: "5+ days/week", label: "5+ days/week" },
      ],
    },
    {
      id: "fg_vitafruit",
      label: "How often do you eat vitamin-A fruits/veg? (mango, papaya, carrot)",
      type: "select",
      required: true,
      options: [
        { value: "Never", label: "Never" },
        { value: "1-2 days/week", label: "1-2 days/week" },
        { value: "3-4 days/week", label: "3-4 days/week" },
        { value: "5+ days/week", label: "5+ days/week" },
      ],
    },
    {
      id: "fg_othfruit",
      label: "How often do you eat other fruits?",
      type: "select",
      required: true,
      options: [
        { value: "Never", label: "Never" },
        { value: "1-2 days/week", label: "1-2 days/week" },
        { value: "3-4 days/week", label: "3-4 days/week" },
        { value: "5+ days/week", label: "5+ days/week" },
      ],
    },
  ],

  economic: [
    {
      id: "fi_worry",
      label: "Do you worry that food might run out before you get money to buy more?",
      type: "select",
      required: true,
      options: [
        { value: "Never", label: "Never" },
        { value: "Rarely", label: "Rarely" },
        { value: "Sometimes", label: "Sometimes" },
        { value: "Often", label: "Often" },
      ],
    },
    {
      id: "meals_day",
      label: "How many meals do you usually eat per day?",
      type: "select",
      required: true,
      options: [
        { value: "1", label: "1 meal" },
        { value: "2", label: "2 meals" },
        { value: "3", label: "3 meals" },
        { value: "More than 3", label: "More than 3 meals" },
      ],
    },
    {
      id: "cost_barrier",
      label: "Does cost prevent your family from buying enough food?",
      type: "select",
      required: true,
      options: [
        { value: "No", label: "No" },
        { value: "Yes, somewhat", label: "Yes, somewhat" },
        { value: "Yes, a major reason", label: "Yes, a major reason" },
      ],
    },
  ],

  awareness: [
    {
      id: "know_protein",
      label: "Do you know which foods are good sources of protein?",
      type: "select",
      required: true,
      options: [
        { value: "Clearly", label: "Clearly" },
        { value: "Roughly", label: "Roughly" },
        { value: "Heard of it", label: "Heard of it" },
        { value: "No idea", label: "No idea" },
      ],
    },
    {
      id: "think_balanced",
      label: "How often do you think about eating a balanced diet?",
      type: "select",
      required: true,
      options: [
        { value: "Often", label: "Often" },
        { value: "Sometimes", label: "Sometimes" },
        { value: "Rarely", label: "Rarely" },
        { value: "Never", label: "Never" },
      ],
    },
    {
      id: "know_needs",
      label: "Do you know what nutritional needs children like you have?",
      type: "select",
      required: true,
      options: [
        { value: "Yes", label: "Yes" },
        { value: "Somewhat", label: "Somewhat" },
        { value: "No", label: "No" },
      ],
    },
  ],

  barriers: [
    {
      id: "avail_protein",
      label: "How easy is it to find protein-rich foods in your area?",
      type: "select",
      required: true,
      options: [
        { value: "Easily available", label: "Easily available" },
        { value: "Somewhat", label: "Somewhat available" },
        { value: "Hard to get", label: "Hard to get" },
        { value: "Not available", label: "Not available" },
      ],
    },
    {
      id: "school_meal",
      label: "Do you get school meals?",
      type: "select",
      required: true,
      options: [
        { value: "Yes, daily", label: "Yes, daily" },
        { value: "Sometimes", label: "Sometimes" },
        { value: "No", label: "No" },
      ],
    },
  ],
};
