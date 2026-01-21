import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema(
  {
    sectionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Section",
      required: true,
      index: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    content: {
      type: String, // text for now (video later)
      required: true,
    },

    order: {
      type: Number,
      required: true,
    },

    isPreview: {
      type: Boolean,
      default: false, // free preview lesson
    },
  },
  { timestamps: true }
);

export const Lesson = mongoose.model("Lesson", lessonSchema);
