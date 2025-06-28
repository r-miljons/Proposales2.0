"use client";

import React from "react";
import countries from "@/lib/countries.json";
import { FixedSizeList as List, ListChildComponentProps } from 'react-window';
import WorldFlag from "react-world-flags";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronsUpDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { phoneNumberStartsWithCountryCode } from "@/lib/phoneNumberStartsWithCountryCode";

// Utility to extract country list with code, flag, and name
const countryList = (countries as any[])
  .filter(c => c.idd && c.idd.root && c.idd.suffixes && c.idd.suffixes.length > 0)
  .map(c => ({
    code: c.idd.root + c.idd.suffixes[0],
    name: c.name.common,
    flag: c.flag,
    cca2: c.cca2,
  }))
  .sort((a, b) => a.name.localeCompare(b.name));

export interface CountryCodePhoneInputProps {
  value: { countryCode: string; phone: string };
  onChange: (val: { countryCode: string; phone: string }) => void;
  label?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  errorCountryCode?: boolean;
  errorPhone?: boolean;
}

export const CountryCodePhoneInput: React.FC<CountryCodePhoneInputProps> = ({
  value,
  onChange,
  label = "Telefona numurs",
  disabled = false,
  required = false,
  className = "",
  errorCountryCode = false,
  errorPhone = false,
}) => {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const selectedCountry = countryList.find(
    c => c.code === value.countryCode
  ) || countryList[0];

  // Filter countries by code
  const filteredCountries = React.useMemo(() => {
    // Only search by numeric code
    const searchDigits = search.replace(/[^\d]/g, "");
    return countryList.filter(c =>
      c.code.replace(/[^\d]/g, "").includes(searchDigits)
    );
  }, [search]);

  const ITEM_HEIGHT = 40;
  const MAX_VISIBLE = 5;

  const CountryRow: React.FC<ListChildComponentProps<typeof filteredCountries>> = ({ index, style, data }) => {
    const country = data[index];
    return (
      <CommandItem
        key={country.code}
        style={style}
        value={country.code + ' ' + country.name}
        onSelect={() => {
          onChange({
            countryCode: country.code,
            phone: value.phone,
          });
          setOpen(false);
        }}
        className={cn(
          'flex items-center gap-2 py-2 px-3',
          value.countryCode === country.code && 'bg-accent'
        )}
      >
        <WorldFlag code={country.cca2} style={{ width: 24, height: 18, borderRadius: 2, objectFit: 'cover' }} />
        <span className="truncate">{country.name}</span>
        <span className="ml-auto text-muted-foreground">+{country.code.replace(/[^\d]/g, "")}</span>
        <Check
          className={cn(
            "ml-2 h-4 w-4",
            value.countryCode === country.code ? "opacity-100" : "opacity-0"
          )}
        />
      </CommandItem>
    );
  };

  return (
    <div className={cn("flex flex-col gap-2", className)}>

      <div className="flex gap-2">
        {/* Country code combobox */}
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className={cn("w-[150px] justify-between", errorCountryCode && "border-destructive focus:ring-destructive")}
              disabled={disabled}
            >
              <span className="flex items-center gap-2">
                <WorldFlag code={selectedCountry.cca2} style={{ width: 24, height: 18, borderRadius: 2, objectFit: 'cover' }} />
                <span className="truncate">+{selectedCountry.code.replace(/[^\d]/g, "")}</span>
              </span>
              <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[260px] p-0">
            <Command>
              <CommandInput
                placeholder="Meklēt valsti pēc koda..."
                className="h-9"
                value={search}
                onValueChange={setSearch}
              />
              <CommandList>
                <CommandEmpty>Valsts nav atrasta.</CommandEmpty>
                <CommandGroup>
                  {filteredCountries.length > 0 ? (
                    <List
                      height={Math.min(filteredCountries.length, MAX_VISIBLE) * ITEM_HEIGHT}
                      itemCount={filteredCountries.length}
                      itemSize={ITEM_HEIGHT}
                      width={"100%"}
                      itemData={filteredCountries}
                      overscanCount={2}
                    >
                      {({ index, style, data }: ListChildComponentProps<typeof filteredCountries>) => (
                        <CountryRow index={index} style={style} data={data} />
                      )}
                    </List>
                  ) : null}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        {/* Phone input */}
        <Input
          id="phone-input"
          type="tel"
          autoComplete="tel"
          placeholder="Telefona numurs"
          value={value.phone}
          onChange={e => {
            const inputPhone = e.target.value;
            const inputType = (e.nativeEvent as InputEvent)?.inputType;
            // Only try to detect a country code if the input starts with '+'
            if (inputPhone.startsWith('+')) {
              let matchedCountry = countryList.find(country =>
                phoneNumberStartsWithCountryCode(country.cca2, inputPhone)
              );
              // If a country is detected and it's different from the current, update country code
              if (matchedCountry && matchedCountry.code !== value.countryCode) {
                onChange({ countryCode: matchedCountry.code, phone: inputPhone });
                return;
              }
            }
            // Remove country code if autofill or paste
            const isAutofillOrPaste = inputType === 'insertReplacementText' || inputType === 'insertFromPaste' || inputPhone.length - value.phone.length > 3;
            if (isAutofillOrPaste) {
              const selected = countryList.find(c => c.code === value.countryCode);
              if (selected) {
                const escapeRegExp = (str: string) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                const codes = (selected.code.startsWith('+') ? [selected.code] : ['+' + selected.code.replace(/[^\d]/g, '')]);
                const normalizedPhone = inputPhone.replace(/[^\d+]/g, '');
                let codeToRemove = codes.find(code =>
                  normalizedPhone.startsWith(code.replace(/[^\d+]/g, '')) ||
                  normalizedPhone.startsWith(code.replace(/[^\d+]/g, '').replace('+', ''))
                );
                if (codeToRemove) {
                  let local = inputPhone.replace(new RegExp('^' + escapeRegExp(codeToRemove)), '');
                  local = local.replace(/^0+/, '');
                  local = local.trim();
                  onChange({ countryCode: value.countryCode, phone: local });
                  return;
                }
              }
            }
            onChange({ countryCode: value.countryCode, phone: inputPhone });
          }}
          onBlur={e => {
            const escapeRegExp = (str: string) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const inputPhone = e.target.value;
            const selected = countryList.find(c => c.code === value.countryCode);
            if (!selected) return;
            // Build all possible codes for the selected country
            const codes = (selected.code.startsWith('+') ? [selected.code] : ['+' + selected.code.replace(/[^\d]/g, '')]);
            // Remove all non-digit chars for comparison
            const normalizedPhone = inputPhone.replace(/[^\d+]/g, '');
            let codeToRemove = codes.find(code =>
              normalizedPhone.startsWith(code.replace(/[^\d+]/g, '')) ||
              normalizedPhone.startsWith(code.replace(/[^\d+]/g, '').replace('+', ''))
            );
            if (codeToRemove) {
              // Remove code from phone (with or without plus)
              let local = inputPhone.replace(new RegExp('^' + escapeRegExp(codeToRemove)), '');
              local = local.replace(/^0+/, ''); // Remove leading zeros
              local = local.trim();
              onChange({ countryCode: value.countryCode, phone: local });
            }
          }}
          disabled={disabled}
          required={required}
          className={cn("flex-1", errorPhone && "border-destructive focus:ring-destructive")}
        />
      </div>
    </div>
  );
};
