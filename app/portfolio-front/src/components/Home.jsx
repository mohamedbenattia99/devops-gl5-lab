import axios from "axios";
import {  useEffect, useState } from "react";
import {InfinitySpin} from "react-loader-spinner";
import Project from "./Project";
import Profile from "./Profile";



const PORTFOLIO_URL = process.env.REACT_APP_MSA_URL || "http://localhost:3001" ;
const PROFILE_URL = process.env.REACT_APP_MSB_URL || "http://localhost:3002" ;

console.log("process.env : ",process.env.REACT_APP_MSA_URL)

export default function ProfileRepo() {
    const [profile,setProfile] = useState({});
    const [projects,setProjects] = useState([]);
    const [isLoading,setIsLoading] = useState(true);
   

    useEffect(() => {
        getProfile();
        getProjects();
    }, []);
    
  
    const getProfile = () => {
        axios.get(`${PROFILE_URL}/profile`)
            .then(response => {
                setProfile(response.data);
                console.log("PROFILE: ",response.data);
            })        
            .catch(err => {
                console.log(err);
            })
    }

   
    const getProjects = () => {
        axios.get(`${PORTFOLIO_URL}/projects`)
            .then(response => {
                setProjects(response.data);
                setIsLoading(false);
                console.log("projects: ",response.data)
            })        
            .catch(err => {
                console.log(err);
            })
    }


    return(
        <div>
            {isLoading ? (
                <InfinitySpin
                    width="80"
                    color="#4fa94d"
                />
            ) : (        
                <div className="portfolio">
                    <Profile profile={profile}/>  
                    <div className="projects-container">
                        
                        {projects.length === 0 ? (
                            <div className="not-found">No projects found...</div>
                        ) : (
                            projects.map((project) => (
                            <Project project={project} />
                            )))
                        }
                    </div> 
                 </div>
            )}
        </div>
      
    )
}