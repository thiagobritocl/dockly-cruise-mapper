import { drizzle } from "drizzle-orm/mysql2";
import { companies, ships, ports, itineraries, itineraryStops } from "../drizzle/schema";
import { eq } from "drizzle-orm";

const db = drizzle(process.env.DATABASE_URL!);

/**
 * Função para executar o seed completo de dados
 * Importa os dados do arquivo seed-complete-data.mjs e os insere no banco
 */
export async function seedCompleteData() {
  try {
    console.log("🌱 Iniciando seed completo de dados...\n");

    // Importar os dados do arquivo seed
    const { 
      companiesData, 
      shipsData, 
      portsData, 
      itinerariesData, 
      itineraryStopsData 
    } = await import("../seed-complete-data.mjs");

    let companiesInserted = 0;
    let shipsInserted = 0;
    let portsInserted = 0;
    let itinerariesInserted = 0;
    let stopsInserted = 0;

    // 1. Inserir companhias
    console.log("📋 Inserindo companhias...");
    for (const company of companiesData) {
      try {
        await db.insert(companies).values(company).onDuplicateKeyUpdate({
          set: {
            name: company.name,
            description: company.description,
            logoUrl: company.logoUrl,
            websiteUrl: company.websiteUrl,
            updatedAt: new Date(),
          },
        });
        companiesInserted++;
      } catch (error) {
        console.error(`❌ Erro ao inserir companhia ${company.name}:`, error);
      }
    }
    console.log(`✅ ${companiesInserted} companhias processadas\n`);

    // 2. Inserir portos
    console.log("🏝️  Inserindo portos...");
    for (const port of portsData) {
      try {
        await db.insert(ports).values(port).onDuplicateKeyUpdate({
          set: {
            name: port.name,
            country: port.country,
            latitude: port.latitude,
            longitude: port.longitude,
            updatedAt: new Date(),
          },
        });
        portsInserted++;
      } catch (error) {
        console.error(`❌ Erro ao inserir porto ${port.name}:`, error);
      }
    }
    console.log(`✅ ${portsInserted} portos processados\n`);

    // 3. Inserir navios
    console.log("🚢 Inserindo navios...");
    for (const ship of shipsData) {
      try {
        await db.insert(ships).values(ship).onDuplicateKeyUpdate({
          set: {
            name: ship.name,
            companyId: ship.companyId,
            yearBuilt: ship.yearBuilt,
            capacity: ship.capacity,
            tonnage: ship.tonnage,
            length: ship.length,
            imageUrl: ship.imageUrl,
            updatedAt: new Date(),
          },
        });
        shipsInserted++;
      } catch (error) {
        console.error(`❌ Erro ao inserir navio ${ship.name}:`, error);
      }
    }
    console.log(`✅ ${shipsInserted} navios processados\n`);

    // 4. Inserir itinerários
    console.log("🗺️  Inserindo itinerários...");
    for (const itinerary of itinerariesData) {
      try {
        await db.insert(itineraries).values(itinerary).onDuplicateKeyUpdate({
          set: {
            shipId: itinerary.shipId,
            name: itinerary.name,
            duration: itinerary.duration,
            departurePort: itinerary.departurePort,
            departureDate: itinerary.departureDate,
            returnDate: itinerary.returnDate,
            price: itinerary.price,
            updatedAt: new Date(),
          },
        });
        itinerariesInserted++;
      } catch (error) {
        console.error(`❌ Erro ao inserir itinerário ${itinerary.name}:`, error);
      }
    }
    console.log(`✅ ${itinerariesInserted} itinerários processados\n`);

    // 5. Inserir paradas de itinerários
    console.log("📍 Inserindo paradas de itinerários...");
    for (const stop of itineraryStopsData) {
      try {
        await db.insert(itineraryStops).values(stop).onDuplicateKeyUpdate({
          set: {
            itineraryId: stop.itineraryId,
            portId: stop.portId,
            dayNumber: stop.dayNumber,
            arrivalTime: stop.arrivalTime,
            departureTime: stop.departureTime,
            updatedAt: new Date(),
          },
        });
        stopsInserted++;
      } catch (error) {
        console.error(`❌ Erro ao inserir parada:`, error);
      }
    }
    console.log(`✅ ${stopsInserted} paradas processadas\n`);

    console.log("✨ Seed completo finalizado com sucesso!\n");
    console.log("📊 Resumo:");
    console.log(`   - ${companiesInserted} companhias`);
    console.log(`   - ${shipsInserted} navios`);
    console.log(`   - ${portsInserted} portos`);
    console.log(`   - ${itinerariesInserted} itinerários`);
    console.log(`   - ${stopsInserted} paradas`);

    return {
      companiesInserted,
      shipsInserted,
      portsInserted,
      itinerariesInserted,
      stopsInserted,
      message: "Seed completo executado com sucesso!",
    };
  } catch (error: any) {
    console.error("❌ Erro ao executar seed:", error.message);
    throw error;
  }
}
