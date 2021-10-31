import { useRouter } from "next/router";
import { useMemo } from "react";

export const useRoute = () => {
  const router = useRouter();

  const isBuilder = useMemo(
    () => router.route.includes("build"),
    [router.route]
  );

  const isEditor = useMemo(() => router.query.id?.length, [router.query]);

  return { isBuilder, isEditor };
};
