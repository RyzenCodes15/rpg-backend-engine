package com.rpgengine.common.config;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.AfterThrowing;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Aspect
@Component
public class LoggingAspect {

    private static final Logger log = LoggerFactory.getLogger(LoggingAspect.class);

    @Before("execution(* com.rpgengine..application..*(..)) || execution(* com.rpgengine..presentation..*(..))")
    public void logBefore(JoinPoint joinPoint) {
        if (log.isDebugEnabled()) {
            log.debug("Entering: {}.{}() with argument[s] = {}", 
                joinPoint.getSignature().getDeclaringTypeName(),
                joinPoint.getSignature().getName(), 
                Arrays.toString(joinPoint.getArgs()));
        } else {
            log.info("Executing action: {}.{}", joinPoint.getSignature().getDeclaringType().getSimpleName(), joinPoint.getSignature().getName());
        }
    }

    @AfterReturning(pointcut = "execution(* com.rpgengine..application..*(..))", returning = "result")
    public void logAfterReturning(JoinPoint joinPoint, Object result) {
        if (log.isDebugEnabled()) {
            log.debug("Method Return: {}.{}() with result = {}", 
                joinPoint.getSignature().getDeclaringTypeName(),
                joinPoint.getSignature().getName(), result);
        }
    }

    @AfterThrowing(pointcut = "execution(* com.rpgengine..application..*(..)) || execution(* com.rpgengine..presentation..*(..))", throwing = "e")
    public void logAfterThrowing(JoinPoint joinPoint, Throwable e) {
        log.error("Exception in {}.{}() with cause = '{}' and exception = '{}'", 
            joinPoint.getSignature().getDeclaringTypeName(),
            joinPoint.getSignature().getName(), 
            e.getCause() != null ? e.getCause() : "NULL", 
            e.getMessage(), e);
    }
}
