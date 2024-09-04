import React, { useState, useCallback } from 'react';
import { Drawer } from '@/components/ui/drawer';
import { X } from 'lucide-react';
import { DrawerContent, DrawerClose } from './ui/drawer';
import { Button } from './ui/button';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import { DialogDescription, DialogTitle } from '@radix-ui/react-dialog';

type DrawerProps = {
  children: React.ReactNode;
  title?: string;
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
      <DrawerContent className="max-h-[calc(100vh-20px)] max-w-2xl mx-auto">
        <VisuallyHidden.Root>
          <DialogTitle>{drawerContent?.title || "Tiêu đề"}</DialogTitle>
          <DialogDescription>{drawerContent?.title || "Tiêu đề"}</DialogDescription>
        </VisuallyHidden.Root>
        <DrawerClose className="absolute top-4 right-4 bg-background" asChild>
          <Button variant="outline" className="rounded-full h-fit p-2">
            <X className="w-4 h-4" strokeWidth={2} />
          </Button>
        </DrawerClose>
        <div className="p-4 overflow-y-scroll">
          {drawerContent?.children}
        </div>
      </DrawerContent>
    </Drawer>
  );
};
