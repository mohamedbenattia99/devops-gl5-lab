let projects = require('./projects.json')


function getProjects() {
    return new Promise((resolve, reject) => {
        if (projects.length === 0) {
            reject({
                message: 'no projects available',
                status: 202
            })
        }
        console.log("prokkkk: ",projects)
        resolve(projects)
    })
}


module.exports = getProjects;