const createPostPolicy = (req, res, next) => {
    const isContentExists = req.body.content;
    const isFileExists = req.files && req.files.file;

    if(!isContentExists && !isFileExists) {
        res.status(422).json({ message: 'You need to enter either content or file or both'})
    }

    next();
};


module.exports = {
    createPostPolicy
}