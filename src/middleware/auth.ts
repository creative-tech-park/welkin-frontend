
// @ts-ignore
import { useAuthStore } from '@/stores/useAuthStore.js'

export default (to:any, from:any, next:any):void => {
	const auth = useAuthStore()

	let exceptionalRoutes :string[] = ['Login', 'register', 'forgot-password']
	let isGoingExceptionalRoutes :boolean = exceptionalRoutes.includes(to.name)

	// let authProjected :string[] = ['Dashboard','Checkout', 'Services', 'AddServices', 'Package']
	let authProjected :string[] = ['Dashboard','Checkout', 'Services', 'AddServices', 'Package']
	let isAuthProjected :boolean = authProjected.includes(to.name)


	if (!auth.isLoggedIn && isAuthProjected) {
		next({ name: 'Login', query:{ redirect: to.path }})
	}else if (auth.isLoggedIn && isGoingExceptionalRoutes) {
		next({ name: 'Dashboard', query: { 'redirect-reason': 'already logged' } })
	} else {
		next()
	}
}
