import en from "./locales/en.json";
import ru from "./locales/ru.json";
import { getLocalizedProjects, projectsData } from "./components/projects";

jest.mock("gsap", () => ({
  __esModule: true,
  default: { registerPlugin: jest.fn() },
}));

jest.mock("gsap/ScrollTrigger", () => ({
  ScrollTrigger: {},
}));

jest.mock("react-router-dom", () => ({}), { virtual: true });

const locales = [
  { name: "en", items: en.projects.items },
  { name: "ru", items: ru.projects.items },
];

test.each(locales)(
  "$name translations are bound by project id",
  ({ items }) => {
    const projects = getLocalizedProjects(items);

    expect(projects).toHaveLength(projectsData.projects.length);
    expect(projects.map((project) => project.id)).toEqual(
      projectsData.projects.map((project) => project.id),
    );

    projects.forEach((project) => {
      const translation = items.find((item) => item.id === project.id);

      expect(translation).toBeDefined();
      expect(project.title).toBe(translation?.title);
      expect(project.brief).toBe(translation?.brief);
      expect(project.description).toBe(translation?.description);
    });
  },
);

test.each(locales)(
  "$name translations stay bound to projects when the order changes",
  ({ items }) => {
    const projects = getLocalizedProjects(items);
    const shuffled = [...items].reverse();
    const shuffledProjects = getLocalizedProjects(shuffled);

    expect(shuffledProjects).toEqual(projects);
  },
);
