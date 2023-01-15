let profile = require('./profile.json')


function getProfile() {
    return new Promise((resolve, reject) => {
        if (profile.length === 0) {
            reject({
                message: 'no profile available',
                status: 202
            })
        }

        resolve(profile)
    })
}

module.exports = getProfile;