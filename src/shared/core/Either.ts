export type Left<T> = { tag: "left"; value: T}; 

export type Right<T> = { tag: "right"; value: T };

export type Either<L, R> = Left<L> | Right<R>;

export function left<t>(value: t): Left<t>{
	return {tag: 'left', value } 
}

export function right<t>(value: t): Right<t>{
	return {tag: 'right', value } 
}
