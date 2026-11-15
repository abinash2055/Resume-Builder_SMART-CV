
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";

import {
    SortableContext,
    useSortable,
    verticalListSortingStrategy,
    sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";

import {
    GripVertical,
    Eye,
    EyeOff,
    ListOrdered,
} from "lucide-react";

import { useResumeStore } from "../../store/resumeStore";

function SortableSection({ section, onToggle }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: section.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3"
        >
            <button
                type="button"
                {...attributes}
                {...listeners}
                aria-label={`Drag to reorder ${section.title}`}
                className="cursor-grab touch-none rounded-md p-1 text-slate-400 hover:bg-slate-100 active:cursor-grabbing"
            >
                <GripVertical size={19} />
            </button>

            <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-slate-800">
                    {section.title}
                </p>

                <p className="mt-0.5 text-xs text-slate-500">
                    {section.required ? "Required section" : "Optional section"}
                </p>
            </div>

            <button
                type="button"
                onClick={() => onToggle(section.id)}
                disabled={section.required}
                aria-label={
                    section.visible
                        ? `Hide ${section.title}`
                        : `Show ${section.title}`
                }
                title={
                    section.required
                        ? "This section is required"
                        : section.visible
                            ? "Hide section"
                            : "Show section"
                }
                className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-indigo-600 disabled:cursor-not-allowed disabled:opacity-40"
            >
                {section.visible ? (
                    <Eye size={18} />
                ) : (
                    <EyeOff size={18} />
                )}
            </button>
        </div>
    );
}

export default function SectionManager() {
    const sections = useResumeStore((state) => state.sections) ?? [];

    const toggleSectionVisibility = useResumeStore(
        (state) => state.toggleSectionVisibility
    );

    const reorderSections = useResumeStore(
        (state) => state.reorderSections
    );

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 5,
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const sortedSections = [...sections].sort(
        (a, b) => a.order - b.order
    );

    const handleDragEnd = (event) => {
        const { active, over } = event;

        if (!over || active.id === over.id) return;

        reorderSections(active.id, over.id);
    };

    return (
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="mb-5 flex items-center gap-2">
                <ListOrdered size={20} className="text-indigo-600" />

                <div>
                    <h2 className="text-lg font-semibold text-slate-900">
                        Section Manager
                    </h2>

                    <p className="text-sm text-slate-500">
                        Drag to reorder sections or control their visibility.
                    </p>
                </div>
            </div>

            <div className="mb-4 flex flex-wrap gap-4 text-xs text-slate-500">
                <span className="flex items-center gap-1.5">
                    <Eye size={14} />
                    Visible
                </span>

                <span className="flex items-center gap-1.5">
                    <EyeOff size={14} />
                    Hidden
                </span>

                <span className="flex items-center gap-1.5">
                    <GripVertical size={14} />
                    Drag to reorder
                </span>
            </div>

            {sortedSections.length === 0 ? (
                <p className="rounded-xl border border-dashed border-slate-300 p-6 text-center text-sm text-slate-500">
                    No sections available.
                </p>
            ) : (
                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                >
                    <SortableContext
                        items={sortedSections.map((section) => section.id)}
                        strategy={verticalListSortingStrategy}
                    >
                        <div className="space-y-2">
                            {sortedSections.map((section) => (
                                <SortableSection
                                    key={section.id}
                                    section={section}
                                    onToggle={toggleSectionVisibility}
                                />
                            ))}
                        </div>
                    </SortableContext>
                </DndContext>
            )}
        </section>
    );
}
