import axios from "axios";
import {  useEffect, useState } from "react";
import {InfinitySpin} from "react-loader-spinner";
import Project from "./Project";
import Profile from "./Profile";

const PORTFOLIO_URL = process.env.MSA_HOST || "localhost" ;
const msaPort = parseInt(process.env.MSA_PORT) || 3001;
const PROFILE_URL = process.env.MSB_HOST || "localhost" ;
const msbPort = parseInt(process.env.MSB_PORT) || 3002;




export default function ProfileRepo() {
    const [profile,setProfile] = useState({});
    const [projects,setProjects] = useState([]);
    const [isLoading,setIsLoading] = useState(true);
   

    useEffect(() => {
        getProfile();
        getProjects();
    }, []);
    
    /**
     * Fetching user info from github api
     * If username doesn't exist we redirect to 404 page
     */
    const getProfile = () => {
        axios.get(`http://${PROFILE_URL}:${msbPort}/profile`)
            .then(response => {
                setProfile(response.data);
                console.log("PROFILE: ",response.data);
            })        
            .catch(err => {
                console.log(err);
            })
    }

    /**
     * Fetching user projects by username
     * Set Loading to false to render UI
     * Set FiltredProjects to all fetched projects
     * */
    const getProjects = () => {
        axios.get(`http://${PORTFOLIO_URL}:${msaPort}/projects`)
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