// Project data for Ayodhya Estates
export const projects = [
  {
    id: "panchi-vihar",
    name: "Panchi Vihar",
    tagline: "Luxury Township in Holy Ayodhya",
    location: "Ayodhya, Uttar Pradesh",
    description: "Panchi Vihar represents the premium townships of Ayodhya Estates. A sophisticated residential community designed with modern amenities and spiritual harmony.",
    features: [
      "Modern architecture blended with traditional aesthetics",
      "World-class amenities and connectivity",
      "Community-focused living spaces",
      "Strategic location near major landmarks"
    ],
    highlights: [
      { title: "Location", description: "Strategically positioned in Ayodhya" },
      { title: "Connectivity", description: "Connected to all major areas" },
      { title: "Amenities", description: "World-class facilities and services" }
    ],
    image: "/assets/site/panchi-vihar-hero.jpg",
    status: "featured",
    launchDate: "2024"
  }
];

export const getProjectById = (id) => {
  return projects.find(project => project.id === id);
};

export const getFeaturedProjects = () => {
  return projects.filter(project => project.status === "featured");
};
