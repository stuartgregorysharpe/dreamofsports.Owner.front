export function Timeout(ms: number = 0) {  
    return function(target, key, descriptor) {  
        const originalMethod = descriptor.value;  
        descriptor.value = function (...args) {  
            setTimeout(() => originalMethod.apply(this, args), ms);  
        };  
        
        return descriptor;
    }  
}