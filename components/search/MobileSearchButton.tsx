'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import SearchBar from './SearchBar';

export default function MobileSearchButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="min-h-[44px] min-w-[44px]"
        onClick={() => setOpen(true)}
        aria-label="Pesquisar produtos"
      >
        <Search className="h-5 w-5" />
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Pesquisar Produtos</DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            <SearchBar />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
