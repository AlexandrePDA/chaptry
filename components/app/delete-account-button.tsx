"use client";

export function DeleteAccountButton() {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    if (!confirm("Supprimer définitivement ton compte et toutes tes données ?")) {
      e.preventDefault();
    }
  }

  return (
    <form action="/api/account/delete" method="POST" onSubmit={handleSubmit}>
      <button
        type="submit"
        className="w-full text-left rounded-lg border border-destructive/30 text-destructive px-4 py-3 text-sm hover:bg-destructive/5 transition-colors"
      >
        🗑️ Supprimer mon compte
      </button>
    </form>
  );
}
