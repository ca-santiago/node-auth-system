import { DomainEvents } from "../../../shared/domain/events/DomainEvents";
import { Account } from "../domain/Account";
import { NewUserCreated } from "../domain/Events/NewUserCreated";

(()=>{
	console.log('[AuthSubs] Start loading...');	

  DomainEvents.register((data)=>{
	  console.log('[DomainEvent] Handled User Created');
  }, NewUserCreated.name);

	console.log('[AuthSubs] Ready');
})()

