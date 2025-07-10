import type { CommandInteraction } from "discord.js";
import { ApplicationCommandOptionType, AttachmentBuilder } from "discord.js";
import { Discord, Slash, SlashOption } from "discordx";

@Discord()
export class GenerateImage {
  @Slash({ 
    description: "Generate an image using AI",
    name: "generate-image"
  })
  async generateImage(
    @SlashOption({
      description: "Description of the image to generate",
      name: "prompt",
      required: true,
      type: ApplicationCommandOptionType.String,
    })
    prompt: string,
    interaction: CommandInteraction
  ): Promise<void> {
    await interaction.deferReply();

    try {
      const imageBuffer = await this.callHuggingFaceAPI(prompt);
      
      const attachment = new AttachmentBuilder(imageBuffer, {
        name: "generated-image.png"
      });

      await interaction.editReply({
        content: `Generated image for: "${prompt}"`,
        files: [attachment]
      });

    } catch (error) {
      console.error("Error generating image:", error);
      await interaction.editReply({
        content: "Sorry, there was an error generating the image. Please try again later."
      });
    }
  }

  private async callHuggingFaceAPI(prompt: string): Promise<Buffer> {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0",
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          inputs: prompt,
          parameters: {
            negative_prompt: "blurry, bad quality, distorted",
            num_inference_steps: 20,
            guidance_scale: 7.5
          }
        }),
      }
    );

    if (!response.ok) {
      if (response.status === 503) {
        throw new Error("Model is loading, please try again in a few seconds");
      }
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    const arrayBuffer = await response.arrayBuffer();
    return Buffer.from(arrayBuffer);
  }
}
