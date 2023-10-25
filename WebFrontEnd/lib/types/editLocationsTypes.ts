import { z } from "zod";
import { destinationType } from "./commonTypes";

export const tripFlowAlgorithmSchema = z.array(destinationType);

export type TripFlowAlgorithmType = z.infer<typeof tripFlowAlgorithmSchema>;
