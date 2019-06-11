const mongoose = require('mongoose');
const uri = "mongodb+srv://ravitupkar01:ravitupkar01@cluster0ravi-flkid.mongodb.net/storybook?retryWrites=true";
mongoose.connect(uri,  { useNewUrlParser: true }, function (err) {
    if (err) throw err;
   console.log('Successfully connected');
});

const Person  = require('../model/personModel'); // import user model 

const Story  = require('../model/storyModel'); // import user model 

module.exports.addPersonStory =  (req,  res, next) =>{
    const author = new Person({
        _id: new mongoose.Types.ObjectId(),
        name: 'Ian Fleming',
        age: 50
      });
      
      author.save(function (err) {
        if (err) return handleError(err);
      
        console.log('Successfully connected1');
        const story1 = new Story({
          title: 'Casino Royale',
          author: author._id    // assign the _id from the person
        });
      
        story1.save(function (err) {
          if (err) return handleError(err);
          // thats it!
          console.log('Successfully connected2');
        });
      });
}

module.exports.getPersonStory =  (req,  res, next) =>{
    Story.
    find({}).
    populate({
        path: 'fans',
        match: { age: { $gte: 50 }},
        // Explicitly exclude `_id`, see http://bit.ly/2aEfTdB
        select: 'name -_id',
        options: { limit: 5 }
      }).
    exec(function (err, story) {
      if (err) return handleError(err);
    //   console.log('The author is %s', story.author.name);
      console.log(story);
      // prints "The author is Ian Fleming"
    });

}