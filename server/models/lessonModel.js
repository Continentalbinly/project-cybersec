const mongoose = require("mongoose");

const lessonSchema = new mongoose.Schema({
  course_id: {
    type: String,
    required: true,
  },
  header: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
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
      tittle: {
        type: String,
      },
    },
  ],
  description: {
    type: String,
    required: true,
  },
  lab: {
    type: String,
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
  point: {
    type: Number,
  },
});

module.exports = mongoose.model("Lesson", lessonSchema);
