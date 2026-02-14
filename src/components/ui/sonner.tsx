import { useTheme } from "next-themes";
import { Toaster as Sonner, toast } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      style={{ fontSize: "14px" }}
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg group-[.toaster]:text-[14px] group-[.toaster]:p-5 group-[.toaster]:min-h-[60px]",
          title: "group-[.toast]:text-[15px] group-[.toast]:font-semibold",
          description: "group-[.toast]:text-muted-foreground group-[.toast]:text-[13px]",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
          error:
            "group-[.toaster]:!bg-red-950/90 group-[.toaster]:!border-red-800 group-[.toaster]:!text-red-100",
          success:
            "group-[.toaster]:!bg-emerald-950/90 group-[.toaster]:!border-emerald-800 group-[.toaster]:!text-emerald-100",
        },
      }}
      {...props}
    />
  );
};

export { Toaster, toast };
