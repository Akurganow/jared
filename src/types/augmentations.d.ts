// redux 5 принимает в dispatch только action с index signature (UnknownAction).
// Дополняем базовый интерфейс typescript-fsa, чтобы fsa-экшены были совместимы
// с типами redux 5 / @reduxjs/toolkit 2 без правок в местах вызова.
import 'typescript-fsa'

declare module 'typescript-fsa' {
	interface AnyAction {
		[extraProps: string]: unknown
	}
}
