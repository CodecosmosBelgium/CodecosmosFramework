import { Vector3 } from "@minecraft/server";

function Vector3ToString(vector: Vector3) {
  return vector.x + "," + vector.y + "," + vector.z;
}

export { Vector3ToString };
