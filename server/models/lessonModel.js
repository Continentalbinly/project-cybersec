const mongoose = require("mongoose");

const lessonSchema = new mongoose.Schema({
  course_id: {
    type: String,
  },
  header: {
    type: String,
  },
  title: {
    type: String,
  },
  examples: [
    {
      example: [
        {
          title: {
            type: String,
          },
          explanations: [
            {
              explanation: {
                type: String,
              },
            },
          ],
        },
      ],
    },
  ],
  codes: [
    {
      code: [
        {
          title: {
            type: String,
          },
          explanations: [
            {
              explanation: {
                type: String,
              },
            },
          ],
        },
      ],
    },
  ],
  detailcode: [
    {
      title: {
        type: String,
      },
    },
  ],
  description: {
    type: String,
  },
  lab: {
    type: String,
  },
  question: {
    type: String,
  },
  answer: {
    type: String,
  },
  point: {
    type: Number,
  },
  images: [
    {
      image: [
        {
          title: {
            type: String,
          },
          urls: [
            {
              url: {
                type: String,
              },
            },
          ],
        },
      ],
    },
  ],
});

module.exports = mongoose.model("Lesson", lessonSchema);
