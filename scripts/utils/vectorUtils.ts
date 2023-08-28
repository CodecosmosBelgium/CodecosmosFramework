import { Vector3 } from "@minecraft/server";

function Vector3ToString(vector: Vector3) {
  return vector.x + "," + vector.y + "," + vector.z;
}

function Vector3Add(vector1: Vector3, vector2: Vector3): Vector3 {
  return { x: vector1.x + vector2.x, y: vector1.y + vector2.y, z: vector1.z + vector2.z };
}

export { Vector3ToString, Vector3Add };
