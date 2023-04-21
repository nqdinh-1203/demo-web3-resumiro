import React from 'react'
import SkillContract from "@/src/contracts/Skill";
import { Web3Context } from '@/src/context/Web3Context';
import ExperienceContract, { ExperienceProps } from '@/src/contracts/Experience';
import JobContract, { JobProps } from '@/src/contracts/Job';

type Props = {}

const Recruiter = (props: Props) => {
    const { provider } = React.useContext(Web3Context);
    // Experience
    const [experience, setExperience] = React.useState<ExperienceProps>({ id: -1 });
    // Job
    const [job, setJob] = React.useState<JobProps>({ id: -1 });
    // Candidate-Skill
    const [jobId, setJobId] = React.useState<string>();
    const [skillIds, setSkillIds] = React.useState<string>();


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

    const handleJob = async (action: number) => {
        try {
            if (!provider || !job || job.id === -1) {
                console.log("Cut");
                return;
            }

            let result;
            const jobContract = new JobContract(provider);
            switch (action) {
                case 0:
                    result = await jobContract.addJob(job);
                    break;
                case 1:
                    result = await jobContract.updateJob(job);
                    break;
                case 2:
                    result = await jobContract.deleteJob(job.id);
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
            console.log("Loi o Job");
        }
    }

    const handleJobSkill = async (action: number) => {
        try {
            if (!provider || !jobId || !skillIds) {
                console.log("Cut");
                return;
            }

            let result;
            const skillContract = new SkillContract(provider);

            const arrayIds = skillIds.split(",").map((skill) => Number(skill));
            switch (action) {
                case 0:
                    result = await skillContract.connectJobSkill(Number(jobId), arrayIds);
                    break;
                case 1:
                    result = await skillContract.disconnectJobSkill(Number(jobId), arrayIds);
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
            console.log("Loi o Job-Skill");
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
                <label>Job</label>
                <div>
                    <label>Input ID: </label>
                    <input type="text" className="bg-gray-300 w-50" onChange={(e) => setJob({ ...job, id: Number(e.target.value) })} />
                </div>
                <div>
                    <label>Input title: </label>
                    <input type="text" className="bg-gray-300 w-50" onChange={(e) => setJob({ ...job, title: e.target.value })} />
                </div>
                <div>
                    <label>Input location: </label>
                    <input type="text" className="bg-gray-300 w-50" onChange={(e) => setJob({ ...job, location: e.target.value })} />
                </div>
                <div>
                    <label>Input Job type: </label>
                    <input type="text" className="bg-gray-300 w-50" onChange={(e) => setJob({ ...job, jobType: e.target.value })} />
                </div>
                <div>
                    <label>Input Company Id: </label>
                    <input type="number" className="bg-gray-300 w-50" onChange={(e) => setJob({ ...job, companyId: Number(e.target.value) })} />
                </div>
                <div>
                    <label>Input salary: </label>
                    <input type="text" className="bg-gray-300 w-50" onChange={(e) => setJob({ ...job, salary: Number(e.target.value) })} />
                </div>
                <div>
                    <label>Input field: </label>
                    <input type="text" className="bg-gray-300 w-50" onChange={(e) => setJob({ ...job, field: e.target.value })} />
                </div>
                <div>
                    <label>Input Recruiter Address: </label>
                    <input type="text" className="bg-gray-300 w-50" onChange={(e) => setJob({ ...job, recruiterAddress: e.target.value })} />
                </div>

                <button className="bg-blue-500 hover:bg-blue-700 text-white  py-1 m-2 px-4 rounded-full" onClick={() => handleJob(0)}>Add</button>
                <button className="bg-green-500 hover:bg-green-700 text-white  py-1 m-2 px-4 rounded-full" onClick={() => handleJob(1)}>Update</button>
                <button className="bg-red-500 hover:bg-red-700 text-white  py-1 m-2 px-4 rounded-full" onClick={() => handleJob(2)}>Delete</button>
            </div>

            <div>
                <label>Job Skill</label>
                <div>
                    <label>Input Job Id: </label>
                    <input type="text" className="bg-gray-300 w-50" onChange={(e) => setJobId(e.target.value)} />
                </div>
                <div>
                    <label>Input Skill Ids (seperate with ","): </label>
                    <input type="number" className="bg-gray-300 w-50" onChange={(e) => setSkillIds(e.target.value)} />
                </div>
                <button className="bg-blue-500 hover:bg-blue-700 text-white py-1 m-2 px-4 rounded-full" onClick={() => handleJobSkill(0)}>Connect</button>
                <button className="bg-red-500 hover:bg-red-700 text-white py-1 m-2 px-4 rounded-full" onClick={() => handleJobSkill(1)}>Disconnect</button>
            </div>
        </>
    )
}

export default Recruiter