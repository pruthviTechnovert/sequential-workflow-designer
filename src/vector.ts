
export class Vector {

	public constructor(
		public readonly x: number,
		public readonly y: number) {
	}

	public add(v: Vector): Vector {
		return new Vector(this.x + v.x, this.y + v.y);
	}

	public subtract(v: Vector): Vector {
		return new Vector(this.x - v.x, this.y - v.y);
	}

	public round(): Vector {
		return new Vector(Math.round(this.x), Math.round(this.y));
	}
}
