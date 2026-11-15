
import { useResumeStore } from "../../store/resumeStore";
import { FileText } from "lucide-react";
import Textarea from "../common/Textarea";
import SectionCard from "../common/SectionCard";

function ProfessionalSummary() {
    const summary = useResumeStore(
        (state) => state.resume.professionalSummary
    );

    const updateResumeField = useResumeStore(
        (state) => state.updateResumeField
    );

    return (
        <SectionCard
            title="Professional Summary"
            description="Write a short introduction about your professional background."
            icon={FileText}
        >
            <Textarea
                label="About You"
                name="professionalSummary"
                value={summary}
                onChange={(event) =>
                    updateResumeField("professionalSummary", event.target.value)
                }
                placeholder="Write a professional summary highlighting your experience, skills, achievements, and career goals..."
                rows={6}
                maxLength={1500}
                helperText={`${summary.length}/1500 characters`}
            />
        </SectionCard>
    );
}

export default ProfessionalSummary;
