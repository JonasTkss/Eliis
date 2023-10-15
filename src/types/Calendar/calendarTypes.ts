interface types {
  title: string;
  color: string;
  checkColor?: string;
  borderColor?: string;
}

const typesOptions: types[] = [
  { title: "Education project", color: "var(--clr-primary)" },
  { title: "Theatre/Concert", color: "var(--clr-secondary)" },
  { title: "Meeting", color: "#D388AF" },
  { title: "Training", color: "#DB6762" },
  { title: "Joint event", color: "#C17D7B" },
  { title: "Class event", color: "#E6AF5F" },
  { title: "Learning activity", color: "#87C8C2" },
  { title: "Other event", color: "#75BFDB" },
  {
    title: "Public holidays",
    color: "#FFFFFF",
    checkColor: "#6C757D",
    borderColor: "#DB6762",
  },
];

export { typesOptions };
export type { types };
