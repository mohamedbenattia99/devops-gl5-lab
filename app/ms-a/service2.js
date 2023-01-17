let projects = require('./projects.json')

function getProject(id) {
    return new Promise((resolve, reject) => {
        if (projects.length === 0) {
            reject({
                message: 'no projects available',
                status: 202
            })
        }

        resolve(projects[id-1])
    })
}

module.exports = getProject;
