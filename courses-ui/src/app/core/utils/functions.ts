export const acceptTrueOrElse = (value: boolean, ifTrue: () => void, ifFalse: () => void): void => {
    value
        ? ifTrue() 
        : ifFalse();
}