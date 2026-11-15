
export const createId = () => crypto.randomUUID();

export const createEntry = (fields = {}) => ({
  id: createId(),
  ...fields,
});

export const updateObject = (object, path, value) => {
  const keys = path.split(".");
  const updated = structuredClone(object);

  let current = updated;

  keys.forEach((key, index) => {
    if (index === keys.length - 1) {
      current[key] = value;
    } else {
      current[key] = current[key] ?? {};
      current = current[key];
    }
  });

  return updated;
};

export const reorderItems = (items, activeId, overId) => {
  const oldIndex = items.findIndex((item) => item.id === activeId);
  const newIndex = items.findIndex((item) => item.id === overId);

  if (oldIndex === -1 || newIndex === -1) {
    return items;
  }

  const updated = [...items];
  const [movedItem] = updated.splice(oldIndex, 1);

  updated.splice(newIndex, 0, movedItem);

  return updated;
};

export const moveSection = (sections, sectionId, direction) => {
  const currentIndex = sections.findIndex(
    (section) => section.id === sectionId
  );

  if (currentIndex === -1) return sections;

  const targetIndex =
    direction === "up" ? currentIndex - 1 : currentIndex + 1;

  if (targetIndex < 0 || targetIndex >= sections.length) {
    return sections;
  }

  const updated = [...sections];

  [updated[currentIndex], updated[targetIndex]] = [
    updated[targetIndex],
    updated[currentIndex],
  ];

  return updated.map((section, index) => ({
    ...section,
    order: index,
  }));
};

export const getFullName = (personalInfo = {}) =>
  [personalInfo.firstName, personalInfo.lastName]
    .filter(Boolean)
    .join(" ");

export const getVisibleSections = (sections = []) =>
  [...sections]
    .filter((section) => section.visible)
    .sort((a, b) => a.order - b.order);
