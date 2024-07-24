package com.company.portalbackend.security;

import com.company.portalbackend.entity.Task;
import com.company.portalbackend.entity.User;
import io.jmix.security.model.EntityAttributePolicyAction;
import io.jmix.security.model.EntityPolicyAction;
import io.jmix.security.role.annotation.EntityAttributePolicy;
import io.jmix.security.role.annotation.EntityPolicy;
import io.jmix.security.role.annotation.ResourceRole;
import io.jmix.security.role.annotation.SpecificPolicy;

@ResourceRole(name = "taskRoleChild", code = TaskRoleChildRole.CODE, scope = "UI")
public interface TaskRoleChildRole {
    String CODE = "task-role-child";

    @EntityAttributePolicy(entityClass = Task.class, attributes = {"name", "user", "createdAt", "completedAt", "version", "columnB", "columnA"}, action = EntityAttributePolicyAction.MODIFY)
    @EntityPolicy(entityClass = Task.class, actions = EntityPolicyAction.ALL)
    void task();

    @SpecificPolicy(resources = "*")
    void specific();

    @EntityAttributePolicy(entityClass = User.class, attributes = "*", action = EntityAttributePolicyAction.MODIFY)
    @EntityPolicy(entityClass = User.class, actions = EntityPolicyAction.ALL)
    void user();
}