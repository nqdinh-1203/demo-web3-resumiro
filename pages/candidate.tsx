import React from 'react'
import { Web3Context } from '@/src/context/Web3Context';
import ExperienceContract, { ExperienceProps } from "@/src/contracts/Experience";
import ResumeContract, { ResumeProps } from "@/src/contracts/Resume";
import SkillContract from "@/src/contracts/Skill";
import JobContract from '@/src/contracts/Job';

type Props = {}

const Candidate = (props: Props) => {
    const { provider } = React.useContext(Web3Context);
    // Experience
    const [experience, setExperience] = React.useState<ExperienceProps>({ id: -1 });
    // Resume
    const [resume, setResume] = React.useState<ResumeProps>({ id: -1 });
    // Recruiter-Resume
    const [recruiterAddress, setRecruiterAddress] = React.useState<string>();
    const [resumeId, setResumeId] = React.useState<string>();
    // Candidate-Skill
    const [candidateAddress, setCandidateAddress] = React.useState<string>();
    const [skillIds, setSkillIds] = React.useState<string>();
    // Candidate-Job
    const [candidateAddressApply, setCandidateAddressApply] = React.useState<string>();
    const [jobId, setJobId] = React.useState<string>();

    const handleExperience = async (action: number) => {
        try {
            if (!provider || !experience || experience.id === -1) {
                console.log("Cut");
                return;
            }

            let result;
            const expContract = new ExperienceContract(provider);
            switch (action) {
                case 0:
                    result = await expContract.addExperience(experience);
                    break;
                case 1:
                    result = await expContract.updateExperience(experience);
                    break;
                case 2:
                    result = await expContract.deleteExperience(experience.id);
                    break;
                default:
                    break;
            }

            console.log(result);

            if (!result) {
                throw new Error("Not have result");
            }
            if (result.status == 1) {
                alert("Success transaction");
            } else {
                alert("Failed transaction");
            }
        } catch (error: any) {
            console.log(error);
            console.log("Loi o Experience");
        }
    }

    const handleResume = async (action: number) => {
        try {
            if (!provider || !resume || resume.id === -1) {
                console.log("Cut");
                return;
            }

            let result;
            const resumeContract = new ResumeContract(provider);
            switch (action) {
                case 0:
                    setResume({ ...resume, createAt: new Date().getTime(), updateAt: new Date().getTime() });
                    result = await resumeContract.addResume(resume);
                    break;
                case 1:
                    setResume({ ...resume, createAt: undefined, updateAt: new Date().getTime() });
                    result = await resumeContract.updateResume(resume);
                    break;
                case 2:
                    result = await resumeContract.deleteResume(resume.id);
                    break;
                default:
                    break;
            }

            console.log(result);

            if (!result) {
                throw new Error("Not have result");
            }
            if (result.status == 1) {
                alert("Success transaction");
            } else {
                alert("Failed transaction");
            }
        } catch (error: any) {
            console.log(error);
            console.log("Loi o Resume");
        }
    }

    const handleCandidateSkill = async (action: number) => {
        try {
            if (!provider || !candidateAddress || !skillIds) {
                console.log("Cut");
                return;
            }

            let result;
            const skillContract = new SkillContract(provider);

            const arrayIds = skillIds.split(",").map((skill) => Number(skill));
            switch (action) {
                case 0:
                    result = await skillContract.connectCandidateSkill(candidateAddress, arrayIds);
                    break;
                case 1:
                    result = await skillContract.disconnectCandidateSkill(candidateAddress, arrayIds);
                    break;
                default:
                    break;
            }

            console.log(result);

            if (!result) {
                throw new Error("Not have result");
            }
            if (result.status == 1) {
                alert("Success transaction");
            } else {
                alert("Failed transaction");
            }
        } catch (error: any) {
            console.log(error);
            console.log("Loi o Resume");
        }
    }

    const handleCandidateJob = async (action: number) => {
        try {
            if (!provider || !candidateAddressApply || !jobId) {
                console.log("Cut");
                return;
            }

            let result;
            const jobContract = new JobContract(provider);
            switch (action) {
                case 0:
                    result = await jobContract.connectJobCandidate(candidateAddressApply, Number(jobId));
                    break;
                case 1:
                    result = await jobContract.disconnectJobCandidate(candidateAddressApply, Number(jobId));
                    break;
                default:
                    break;
            }

            console.log(result);

            if (!result) {
                throw new Error("Not have result");
            }
            if (result.status == 1) {
                alert("Success transaction");
            } else {
                alert("Failed transaction");
            }
        } catch (error: any) {
            console.log(error);
            console.log("Loi o Resume-Recruiter");
        }
    }

    const handleResumeRecruiter = async (action: number) => {
        try {
            if (!provider || !resumeId || !recruiterAddress) {
                console.log("Cut");
                return;
            }

            let result;
            const resumeContract = new ResumeContract(provider);
            switch (action) {
                case 0:
                    result = await resumeContract.connectResumeRecruiter(recruiterAddress, Number(resumeId));
                    break;
                case 1:
                    result = await resumeContract.disconnectResumeRecruiter(recruiterAddress, Number(resumeId));
                    break;
                default:
                    break;
            }

            console.log(result);

            if (!result) {
                throw new Error("Not have result");
            }
            if (result.status == 1) {
                alert("Success transaction");
            } else {
                alert("Failed transaction");
            }
        } catch (error: any) {
            console.log(error);
            console.log("Loi o Resume-Recruiter");
        }
    }

    return (
        <>
            <div>
                <label>Experience</label>
                <div>
                    <label>Input ID: </label>
                    <input type="text" className="bg-gray-300 w-50" onChange={(e) => setExperience({ ...experience, id: Number(e.target.value) })} />
                </div>
                <div>
                    <label>Input position: </label>
                    <input type="text" className="bg-gray-300 w-50" onChange={(e) => setExperience({ ...experience, position: e.target.value })} />
                </div>
                <div>
                    <label>Input start: </label>
                    <input type="date" className="bg-gray-300 w-50" onChange={(e) => setExperience({ ...experience, start: new Date(e.target.value).getTime() })} />
                </div>
                <div>
                    <label>Input finish: </label>
                    <input type="date" className="bg-gray-300 w-50" onChange={(e) => setExperience({ ...experience, finish: new Date(e.target.value).getTime() })} />
                </div>
                <div>
                    <label>Input Company Id: </label>
                    <input type="number" className="bg-gray-300 w-50" onChange={(e) => setExperience({ ...experience, companyId: Number(e.target.value) })} />
                </div>
                <div>
                    <label>Input User Address: </label>
                    <input type="text" className="bg-gray-300 w-50" onChange={(e) => setExperience({ ...experience, userAddress: e.target.value })} />
                </div>
                <button className="bg-blue-500 hover:bg-blue-700 text-white  py-1 m-2 px-4 rounded-full" onClick={() => handleExperience(0)}>Add</button>
                <button className="bg-green-500 hover:bg-green-700 text-white  py-1 m-2 px-4 rounded-full" onClick={() => handleExperience(1)}>Update</button>
                <button className="bg-red-500 hover:bg-red-700 text-white  py-1 m-2 px-4 rounded-full" onClick={() => handleExperience(2)}>Delete</button>
            </div>

            <div>
                <label>Resume</label>
                <div>
                    <label>Input ID: </label>
                    <input type="number" className="bg-gray-300 w-50" onChange={(e) => setResume({ ...resume, id: Number(e.target.value) })} />
                </div>
                <div>
                    <label>Input Data: </label>
                    <input type="text" className="bg-gray-300 w-50" onChange={(e) => setResume({ ...resume, data: e.target.value })} />
                </div>
                <div>
                    <label>Input Candidate Address: </label>
                    <input type="text" className="bg-gray-300 w-50" onChange={(e) => setResume({ ...resume, candidateAddress: e.target.value })} />
                </div>
                <button className="bg-blue-500 hover:bg-blue-700 text-white  py-1 m-2 px-4 rounded-full" onClick={() => handleResume(0)}>Add</button>
                <button className="bg-green-500 hover:bg-green-700 text-white  py-1 m-2 px-4 rounded-full" onClick={() => handleResume(1)}>Update</button>
                <button className="bg-red-500 hover:bg-red-700 text-white  py-1 m-2 px-4 rounded-full" onClick={() => handleResume(2)}>Delete</button>
            </div>

            <div>
                <label>Approve Recruiter use Resume</label>
                <div>
                    <label>Input Recruiter Address: </label>
                    <input type="text" className="bg-gray-300 w-50" onChange={(e) => setRecruiterAddress(e.target.value)} />
                </div>
                <div>
                    <label>Input Resume Id: </label>
                    <input type="number" className="bg-gray-300 w-50" onChange={(e) => setResumeId(e.target.value)} />
                </div>

                <button className="bg-blue-500 hover:bg-blue-700 text-white  py-1 m-2 px-4 rounded-full" onClick={() => handleResumeRecruiter(0)}>Approve</button>
                <button className="bg-red-500 hover:bg-red-700 text-white  py-1 m-2 px-4 rounded-full" onClick={() => handleResumeRecruiter(1)}>Disapprove</button>
            </div>

            <div>
                <label>Candidate Skill</label>
                <div>
                    <label>Input Candidate Address: </label>
                    <input type="text" className="bg-gray-300 w-50" onChange={(e) => setCandidateAddress(e.target.value)} />
                </div>
                <div>
                    <label>Input Skill Ids (seperate with ","): </label>
                    <input type="number" className="bg-gray-300 w-50" onChange={(e) => setSkillIds(e.target.value)} />
                </div>
                <button className="bg-blue-500 hover:bg-blue-700 text-white py-1 m-2 px-4 rounded-full" onClick={() => handleCandidateSkill(0)}>Connect</button>
                <button className="bg-red-500 hover:bg-red-700 text-white py-1 m-2 px-4 rounded-full" onClick={() => handleCandidateSkill(1)}>Disconnect</button>
            </div>

            <div>
                <label>Candidate Job</label>
                <div>
                    <label>Input Candidate Address: </label>
                    <input type="text" className="bg-gray-300 w-50" onChange={(e) => setCandidateAddressApply(e.target.value)} />
                </div>
                <div>
                    <label>Input Job Id: </label>
                    <input type="number" className="bg-gray-300 w-50" onChange={(e) => setJobId(e.target.value)} />
                </div>
                <button className="bg-blue-500 hover:bg-blue-700 text-white py-1 m-2 px-4 rounded-full" onClick={() => handleCandidateJob(0)}>Apply</button>
                <button className="bg-red-500 hover:bg-red-700 text-white py-1 m-2 px-4 rounded-full" onClick={() => handleCandidateJob(1)}>Disapply</button>
            </div>
        </>
    )
}

export default Candidate