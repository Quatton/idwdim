import HuggingFace from "huggingface";

export const hf = new HuggingFace(process.env.HUGGINGFACE_TOKEN!);

hf.textGeneration({
  model: "google/flan-t5-xxl",
  inputs: "This is a test",
}).then((res) => {
  console.log(res);
});
