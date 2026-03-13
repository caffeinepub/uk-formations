import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
  FormationOrder,
  FormationOrderInput,
  NameAvailabilityResult,
  SubmissionResponse,
  UserProfile,
  UserRole,
} from "../backend";
import { useActor } from "./useActor";

export function useGetCallerUserRole() {
  const { actor, isFetching } = useActor();

  return useQuery<UserRole>({
    queryKey: ["callerUserRole"],
    queryFn: async () => {
      if (!actor) return "guest" as UserRole;
      return actor.getCallerUserRole();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetCallerUserProfile() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<UserProfile | null>({
    queryKey: ["currentUserProfile"],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not available");
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}

export function useSaveCallerUserProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profile: UserProfile) => {
      if (!actor) throw new Error("Actor not available");
      return actor.saveCallerUserProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUserProfile"] });
    },
  });
}

export function useSubmitFormationOrder() {
  const { actor } = useActor();

  return useMutation<SubmissionResponse, Error, FormationOrderInput>({
    mutationFn: async (orderInput: FormationOrderInput) => {
      if (!actor) throw new Error("Actor not available");
      return actor.submitFormationOrder(orderInput);
    },
  });
}

export function useGetAllOrders() {
  const { actor, isFetching } = useActor();

  return useQuery<FormationOrder[]>({
    queryKey: ["allOrders"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllOrders();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetOrderById(orderId: bigint | null) {
  const { actor, isFetching } = useActor();

  return useQuery<FormationOrder | null>({
    queryKey: ["order", orderId?.toString()],
    queryFn: async () => {
      if (!actor || !orderId) return null;
      return actor.getOrderById(orderId);
    },
    enabled: !!actor && !isFetching && orderId !== null,
  });
}

export function useIsCallerAdmin() {
  const { actor, isFetching } = useActor();

  return useQuery<boolean>({
    queryKey: ["isCallerAdmin"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCheckNameAvailability(name: string, enabled: boolean) {
  const { actor, isFetching } = useActor();

  return useQuery<NameAvailabilityResult>({
    queryKey: ["nameAvailability", name],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not available");
      return actor.checkNameAvailability(name);
    },
    enabled: !!actor && !isFetching && enabled && name.trim().length > 0,
    retry: false,
  });
}
