
import { useResumeStore } from "../../store/resumeStore";
import { UserRound } from "lucide-react";
import Input from "../common/Input";
import SectionCard from "../common/SectionCard";

function PersonalDetails() {
    const personalInfo = useResumeStore(
        (state) => state.resume.personalInfo
    );

    const updateResumeField = useResumeStore(
        (state) => state.updateResumeField
    );

    const handleChange = (event) => {
        const { name, value } = event.target;

        updateResumeField(`personalInfo.${name}`, value);
    };

    return (
        <SectionCard
            title="Personal Details"
            description="Add your name and contact information."
            icon={UserRound}
        >
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <Input
                    label="First Name"
                    name="firstName"
                    value={personalInfo.firstName}
                    onChange={handleChange}
                    placeholder="Enter your first name"
                    required
                />

                <Input
                    label="Last Name"
                    name="lastName"
                    value={personalInfo.lastName}
                    onChange={handleChange}
                    placeholder="Enter your last name"
                    required
                />

                <Input
                    label="Professional Job Title"
                    name="jobTitle"
                    value={personalInfo.jobTitle}
                    onChange={handleChange}
                    placeholder="e.g. Full Stack Developer"
                />

                <Input
                    label="Email Address"
                    name="email"
                    type="email"
                    value={personalInfo.email}
                    onChange={handleChange}
                    placeholder="example@email.com"
                />

                <Input
                    label="Phone Number"
                    name="phone"
                    type="tel"
                    value={personalInfo.phone}
                    onChange={handleChange}
                    placeholder="+977 98XXXXXXXX"
                />

                <Input
                    label="Website"
                    name="website"
                    type="url"
                    value={personalInfo.website}
                    onChange={handleChange}
                    placeholder="https://example.com"
                />

                <Input
                    label="City"
                    name="city"
                    value={personalInfo.city}
                    onChange={handleChange}
                    placeholder="Enter your city"
                />

                <Input
                    label="Country"
                    name="country"
                    value={personalInfo.country}
                    onChange={handleChange}
                    placeholder="Enter your country"
                />

                <Input
                    label="Address"
                    name="address"
                    value={personalInfo.address}
                    onChange={handleChange}
                    placeholder="Enter your address"
                />

                <Input
                    label="Postal Code"
                    name="postalCode"
                    value={personalInfo.postalCode}
                    onChange={handleChange}
                    placeholder="Enter postal code"
                />

                <Input
                    label="LinkedIn Profile"
                    name="linkedIn"
                    type="url"
                    value={personalInfo.linkedIn}
                    onChange={handleChange}
                    placeholder="https://linkedin.com/in/username"
                />

                <Input
                    label="GitHub Profile"
                    name="github"
                    type="url"
                    value={personalInfo.github}
                    onChange={handleChange}
                    placeholder="https://github.com/username"
                />

                <Input
                    label="Portfolio URL"
                    name="portfolio"
                    type="url"
                    value={personalInfo.portfolio}
                    onChange={handleChange}
                    placeholder="https://yourportfolio.com"
                />

                <Input
                    label="Profile Image URL"
                    name="profileImage"
                    type="url"
                    value={personalInfo.profileImage}
                    onChange={handleChange}
                    placeholder="https://example.com/photo.jpg"
                    helperText="Optional. Enter a publicly accessible image URL."
                />
            </div>
        </SectionCard>
    );
}

export default PersonalDetails;
