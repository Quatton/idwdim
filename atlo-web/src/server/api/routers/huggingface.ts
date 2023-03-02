import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "src/server/api/trpc";
import { hf } from "@/server/huggingface";
import { TextGenerationReturn } from "huggingface";

export const huggingfaceRouter = createTRPCRouter({
  flant5: protectedProcedure
    .input(
      z.object({
        text: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      return {
        output: await fetch(
          "https://api-inference.huggingface.co/models/google/flan-t5-xxl",
          {
            headers: {
              Authorization: `Bearer ${process.env.HUGGINGFACE_TOKEN}`,
              "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({
              inputs: input.text,
            }),
          }
        ).then(async (res) => {
          const json = await res.json();
          const generated = json[0];

          return generated as TextGenerationReturn;
        }),
      };
    }),
});
