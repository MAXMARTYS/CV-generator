import { OtherSection }       from "./otherSection";
import { GeneralSection }     from "./generalSection";
import { BlankSection } from "./blankSection";

function ExperienceSection({section, onChange, itemElements = ['start', 'end', 'title', 'description', 'location', 'relevant skills']}) {
    return BlankSection({section, onChange, itemElements});
}
function EducationSection({section, onChange, itemElements = ['start', 'end', 'title', 'description', 'location', 'relevant coursework']}) {
    return BlankSection({section, onChange, itemElements});
}
function InternshipSection({section, onChange, itemElements = ['start', 'end', 'title', 'description', 'location']}) {
    return BlankSection({section, onChange, itemElements});
}
function ProjectSection({section, onChange, itemElements = ['start', 'end', 'title', 'description', 'technology', 'link']}) {
    return BlankSection({section, onChange, itemElements});
}
function PublicationSection({section, onChange, itemElements = ['title', 'description', 'doi', 'journal']}) {
    return BlankSection({section, onChange, itemElements});
}
function SkillSection({section, onChange, itemElements = ['name']}) {
    return BlankSection({section, onChange, itemElements});
}

export const SECTION_EDITORS = {
  education:   EducationSection,
  general:     GeneralSection,
  experience:  ExperienceSection,
  internships: InternshipSection,
  projects:    ProjectSection,
  publications: PublicationSection,
  skills:      SkillSection,
  other:  OtherSection
};