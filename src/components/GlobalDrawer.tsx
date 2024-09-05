import React, { useState, useCallback } from 'react';
import { Drawer } from '@/components/ui/drawer';
import { X } from 'lucide-react';
import { DrawerContent, DrawerClose } from './ui/drawer';
import { Button } from './ui/button';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import { DialogDescription, DialogTitle } from '@radix-ui/react-dialog';
import { cn } from '@/lib/utils';

type DrawerProps = {
  children: React.ReactNode;
  title?: string;
  containerClassName?: string;
};

let openDrawerFn: ((props: DrawerProps) => void) | null = null;
let closeDrawerFn: (() => void) | null = null;

export const GlobalDrawer = {
  open: (props: DrawerProps) => openDrawerFn?.(props),
  close: () => closeDrawerFn?.(),
};

export const GlobalDrawerProvider: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [drawerContent, setDrawerContent] = useState<DrawerProps | null>(null);

  const openDrawer = useCallback((props: DrawerProps) => {
    setDrawerContent(props);
    setIsOpen(true);
  }, []);

  const closeDrawer = useCallback(() => {
    setIsOpen(false);
    setDrawerContent(null);
  }, []);

  React.useEffect(() => {
    openDrawerFn = openDrawer;
    closeDrawerFn = closeDrawer;
    return () => {
      openDrawerFn = null;
      closeDrawerFn = null;
    };
  }, [openDrawer, closeDrawer]);

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerContent className={cn("mx-auto", drawerContent?.containerClassName)}>
        <VisuallyHidden.Root>
          <DialogTitle>{drawerContent?.title || "Tiêu đề"}</DialogTitle>
          <DialogDescription>{drawerContent?.title || "Tiêu đề"}</DialogDescription>
        </VisuallyHidden.Root>
        <DrawerClose className="absolute top-3 right-3 bg-gray-200 hover:bg-slate-300 active:scale-95 transition-transform duration-300" asChild>
          <Button variant="outline" className="rounded-full h-fit p-1">
            <X className="w-4 h-4 text-gray-500" strokeWidth={3} />
          </Button>
        </DrawerClose>
        <div className="p-4 overflow-y-scroll">
          {drawerContent?.children}
        </div>
      </DrawerContent>
    </Drawer>
  );
};
