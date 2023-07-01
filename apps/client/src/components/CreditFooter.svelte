<script>
  import Avatar from "$components/ui/avatar/Avatar.svelte";
  import AvatarFallback from "$components/ui/avatar/AvatarFallback.svelte";
  import AvatarImage from "$components/ui/avatar/AvatarImage.svelte";
  import { HoverCard, HoverCardTrigger } from "$components/ui/hover-card";
  import HoverCardContent from "$components/ui/hover-card/HoverCardContent.svelte";
  import { Heart } from "lucide-svelte";
</script>

<scirpt lang="ts" />

<footer class="mt-auto bg-white px-2 py-4 text-center">
  <p>
    This website is made with love by
    <HoverCard>
      <HoverCardTrigger
        href="https://github.com/DrowningToast"
        target="_blank"
        rel="noreferrer noopener"
        class="hover:underline underline-offset-4 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-black text-blue-600"
        >Gus</HoverCardTrigger
      >
      <HoverCardContent class="w-auto">
        <div class="flex justify-between gap-x-4">
          <Avatar>
            <AvatarImage
              src="https://avatars.githubusercontent.com/u/58824744?v=4"
            />
            <AvatarFallback>Gus Profile Icon</AvatarFallback>
          </Avatar>
          <div class="space-y-1">
            <h4 class="text-sm font-semibold">Supratouch Suwatno</h4>
            <p class="text-sm">Fullstack Engineer (React, Svelte)</p>
            <a
              href="https://github.com/DrowningToast"
              target="_blank"
              class="text-sm hover:underline underline-offset-4 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-black text-blue-600"
              >Click for more info</a
            >
            <div class="flex items-center pt-2">
              <Heart class="mr-2 h-4 w-4 opacity-70" />{" "}
              <span class="text-xs text-muted-foreground">
                Available for hire
              </span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  </p>
</footer>
