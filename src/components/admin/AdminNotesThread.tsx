import { useState } from 'react';
import { Send, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import type { MockNote } from '@/data/mockAdminData';

interface AdminNotesThreadProps {
  notes: MockNote[];
  onAddNote?: (content: string) => void;
  className?: string;
}

export function AdminNotesThread({ notes, onAddNote, className }: AdminNotesThreadProps) {
  const [newNote, setNewNote] = useState('');

  const handleSubmit = () => {
    if (newNote.trim() && onAddNote) {
      onAddNote(newNote.trim());
      setNewNote('');
    }
  };

  return (
    <div className={cn('space-y-4', className)}>
      <h4 className="text-sm font-medium text-foreground">Internal Notes</h4>

      {/* Add note form */}
      <div className="space-y-2">
        <Textarea
          placeholder="Add a note..."
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          className="bg-muted/20 border-border/30 min-h-[80px] resize-none"
        />
        <Button
          size="sm"
          onClick={handleSubmit}
          disabled={!newNote.trim()}
          className="w-full sm:w-auto"
        >
          <Send className="h-4 w-4 mr-2" />
          Add Note
        </Button>
      </div>

      {/* Notes list */}
      <div className="space-y-3">
        {notes.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">
            No notes yet
          </p>
        ) : (
          notes.map((note) => (
            <div
              key={note.id}
              className="rounded-lg border border-border/30 bg-muted/10 p-3 space-y-2"
            >
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <User className="h-3 w-3" />
                  <span>{note.author}</span>
                </div>
                <span>•</span>
                <span>{note.timestamp}</span>
              </div>
              <p className="text-sm text-foreground">{note.content}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
